function evaluateCircuit(inputs, nodes, edges) {
    const nodeOutputs = {};

    // Initialize input nodes
    nodes.forEach((node, index) => {
        if (node.type.includes('input')) {
            nodeOutputs[node.id] = inputs[index];
            console.log(`Initialized input for node ${node.id}:`, inputs[index]);
        }
    });

    // Process each gate node
    nodes.forEach(node => {
        if (node.type.includes('Node')) {
            const inputEdges = edges.filter(edge => edge.target === node.id);
            const inputValues = inputEdges.map(edge => nodeOutputs[edge.source]);
            console.log('Input edges:', inputEdges);
            console.log('Input Values-edge: ', inputValues);
            console.log(`Evaluating ${node.type} with inputs:`, inputValues);

            let results;
            switch (node.type) {
                case 'andNode':
                    results = inputValues.reduce((acc, val) => acc && val, true);
                    break;
                case 'orNode':
                    results = inputValues.reduce((acc, val) => acc || val, false);
                    break;
                case 'inputNode':
                    results = node.data.value;
                    break;
                // Add other gate cases
                default:
                    throw new Error(`Unknown gate type: ${node.type}`);
            }
            nodeOutputs[node.id] = results;
            console.log(`Output for ${node.type} (${node.id}):`, nodeOutputs[node.id]);
        }
    });

    // Collect results from output nodes
    const outputNodes = nodes.filter(node => node.type.includes('Output'));
    const outputs = outputNodes.map(node => nodeOutputs[node.id]);
    console.log('Final outputs:', outputs);
    return outputs;
}

function generateCircuitTruthTable(req, res) {
    try {
        console.log('Received request body:', req.body);
        const { nodes, edges } = req.body;
        console.log('Received nodes:', nodes);
        console.log('Received edges:', edges);

        const inputNodes = nodes.filter(node => node.type.includes('input'));
        const outputNodes = nodes.filter(node => node.type.includes('Output'));
        console.log('filtered input: ', inputNodes );
        console.log('Filtered Output: ', outputNodes);
        const numInputs = inputNodes.length;

        if (numInputs === 0 || outputNodes.length === 0) {
            return res.status(400).json({ error: ' must have at least one input and one output.' });
        }

        // Log to confirm reaching this point
        console.log('Generating combinations for input nodes:', numInputs);
        
        const combinations = Array.from({ length: 2 ** numInputs }, (_, i) => {
            const binaryString = i.toString(2).padStart(numInputs, '0');
            return binaryString.split('').map(Number);
        });
        
        console.log('Generated combinations:', combinations);
        // Evaluate circuit for each input combination
        const truthTable = combinations.map(inputs => ({
            inputs,
            outputs: evaluateCircuit(inputs, nodes, edges)
        }));

        res.json(truthTable);
    } catch (error) {
        console.error('Error generating truth table:', error);
        res.status(500).json({ error: 'Failed to generate truth table.', details: error.message });
    }
}

module.exports = { generateCircuitTruthTable };
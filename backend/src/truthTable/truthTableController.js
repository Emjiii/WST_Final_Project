function evaluateCircuit(inputs, nodes, edges) {
    const nodeOutputs = {};

    // Initialize input nodes
    nodes.forEach((node, index) => {
        if (node.type.includes('Input')) {
            nodeOutputs[node.id] = inputs[index];
            console.log(`Initialized input for node ${node.id}:`, inputs[index]);
        }
    });

    // Process each gate node
    nodes.forEach(node => {
        if (node.type.includes('Gate')) {
            const inputEdges = edges.filter(edge => edge.target === node.id);
            const inputValues = inputEdges.map(edge => nodeOutputs[edge.source]);
            console.log(`Evaluating ${node.type} with inputs:`, inputValues);

            let gateFunction;
            switch (node.type) {
                case 'andGate':
                    gateFunction = require('./gates/gateController').andGate;
                    break;
                case 'orGate':
                    gateFunction = require('./gates/gateController').orGate;
                    break;
                // Add other gate cases
                default:
                    throw new Error(`Unknown gate type: ${node.type}`);
            }

            nodeOutputs[node.id] = gateFunction(...inputValues);
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
        const { nodes, edges } = req.body;

        const inputNodes = nodes.filter(node => node.type.includes('Input'));
        const outputNodes = nodes.filter(node => node.type.includes('Output'));
        const numInputs = inputNodes.length;

        if (numInputs === 0 || outputNodes.length === 0) {
            return res.status(400).json({ error: "Circuit must have at least one input and one output." });
        }

        // Generate all possible input combinations
        const combinations = Array.from({ length: 2 ** numInputs }, (_, i) => {
            const binaryString = i.toString(2).padStart(numInputs, '0');
            return binaryString.split('').map(Number);
        });

        // Evaluate circuit for each input combination
        const truthTable = combinations.map(inputs => ({
            inputs,
            outputs: evaluateCircuit(inputs, nodes, edges)
        }));

        res.json(truthTable);
    } catch (error) {
        console.error('Error generating truth table:', error);
        res.status(500).json({ error: 'Failed to generate truth table.' });
    }
}

module.exports = { generateCircuitTruthTable };
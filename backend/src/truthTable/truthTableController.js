function evaluateCircuit(inputs, nodes, edges) {
    const nodeOutputs = {};

    // Initialize input nodes
    nodes.forEach((node, index) => {
        if (node.type.includes('input')) {
            nodeOutputs[node.id] = inputs[index] ? 1 : 0;
            console.log(`Initialized input for node ${node.id}:`, nodeOutputs[node.id]);
        }
    });

    // Process each gate node
    nodes.forEach(node => {
        if (node.type.includes('Node')) {
            const inputEdges = edges.filter(edge => edge.target === node.id);
            const inputValues = inputEdges.map(edge => nodeOutputs[edge.source]);
            console.log('Input Values-edge: ', inputValues);
            console.log('Input Edges:', inputEdges);
            console.log('Input Values: ', inputValues);
            console.log(`Evaluating ${node.type} with inputs:`, inputValues);

            let results;
            switch (node.type) {
                case 'andNode':
                    results = inputValues.reduce((acc, val) => acc && val, true);
                    break;
                case 'orNode':
                    results = inputValues.reduce((acc, val) => acc || val, 0);
                    break;
                case 'norNode':
                    results = !(inputValues.reduce((acc, val) => acc || val, 0)) ? 1 : 0;
                    break;
                case 'notNode':
                    results = inputValues[0] ? 0 : 1;
                    break;
                case 'nandNode':
                    results = !(inputValues.reduce((acc, val) => acc && val, 1)) ? 1 : 0;
                    break;
                case 'xorNode':
                    results = inputValues.reduce((acc, val) => acc ^ val, 0);
                    break;
                case 'xnorNode':
                    results = inputValues.reduce((acc, val) => acc ^ val, 0) === 0 ? 1 : 0;
                    break;
                case 'bufferNode':
                    results = inputValues[0];
                    break;
                case 'inputNode':
                    results = node.data.value ? 1 : 0;
                    break;
                default:
                    throw new Error(`Unknown gate type: ${node.type}`);
            }
            nodeOutputs[node.id] = results;
            console.log(`Output for ${node.type} (${node.id}):`, nodeOutputs[node.id]);
        }
    });

    // Trace outputs through the circuit
    const outputNodes = nodes.filter(node => node.type.includes('Output'));
    const outputs = outputNodes.map(node => node.data.value ? 1 : 0);
    console.log('outputNodes: ', outputNodes);
    console.log('Final outputs:', outputs);
    return outputs;
    
    outputNodes.forEach(outputNode => {
        const inputEdge = edges.find(edge => edge.target === outputNode.id);
        if (inputEdge) {
            const sourceValue = nodeOutputs[inputEdge.source];
            outputs.push(sourceValue === 1 ? 1 : 0);
        } else {
            outputs.push(0);
        }
    });

    return outputs;
}
        //else if (node.type.includes('input')) {
            
        //     // Directly assign input node value to output
        //     nodeOutputs[node.id].node.type = node.data.value ? 1 : 0;
        //     console.log(`Direct output for input node (${node.id}):`, nodeOutputs[node.id]);
        // }
    // });

    //Collect results from output nodes
//     const outputNodes = nodes.filter(node => node.type.includes('Output'));
//     const outputs = outputNodes.map(node => node.data.value ? 1 : 0);
//     console.log('outputNodes: ', outputNodes);
//     console.log('Final outputs:', outputs);
//     return outputs;
// }

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
        
        // const combinations = Array.from({ length: 2 ** numInputs }, (_, i) => {
        //     const binaryString = i.toString(2).padStart(numInputs, '0');
        //     return binaryString.split('').map(Number);
        // });

         // Replace the combination generation with current inputs
        const combinations = [inputNodes.map(node => (node.data.value ? 1 : 0))];
         // Log the current inputs
        console.log('Using current inputs:', combinations);
        
        console.log('Generated combinations:', combinations);
        // Evaluate circuit for each input combination
        const truthTable = combinations.map(inputs => ({
            inputs,
            outputs: evaluateCircuit(inputs, nodes, edges)
        }));

        console.log('sending truthTable: ', truthTable);

        res.json(truthTable);
    } catch (error) {
        console.error('Error generating truth table:', error);
        res.status(500).json({ error: 'Failed to generate truth table.', details: error.message });
    }
}

module.exports = { generateCircuitTruthTable };
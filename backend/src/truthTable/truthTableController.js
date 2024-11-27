// Function to generate truth table for a given gate function
function generateTruthTable(gateFunction, numInputs) {
    const numRows = Math.pow(2, numInputs);
    const truthTable = [];

    for (let i = 0; i < numRows; i++) {
        const inputs = [];
        for (let j = 0; j < numInputs; j++) {
            inputs.push(Boolean(i & (1 << j)));
        }
        const output = gateFunction(...inputs);
        truthTable.push({ inputs, output });
    }

    return truthTable;
}

module.exports = { generateTruthTable };
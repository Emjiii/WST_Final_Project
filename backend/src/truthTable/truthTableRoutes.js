const express = require('express');
const router = express.Router();
const { generateCircuitTruthTable } = require('./truthTableController');

// Route to generate truth table for a circuit
router.post('/circuit', generateCircuitTruthTable);

module.exports = router;
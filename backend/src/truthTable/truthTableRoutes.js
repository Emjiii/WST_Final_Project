const express = require('express');
const router = express.Router();
const gateController = require('../gates/gateController');
const { generateTruthTable } = require('./truthTableController');

// AND Gate Truth Table Route
router.get('/and', (req, res) => {
    const truthTable = generateTruthTable(gateController.andGate, 2);
    res.json(truthTable);
});

// OR Gate Truth Table Route
router.get('/or', (req, res) => {
    const truthTable = generateTruthTable(gateController.orGate, 2);
    res.json(truthTable);
});

// NOT Gate Truth Table Route
router.get('/not', (req, res) => {
    const truthTable = generateTruthTable(gateController.notGate, 1);
    res.json(truthTable);
});

// NAND Gate Truth Table Route
router.get('/nand', (req, res) => {
    const truthTable = generateTruthTable(gateController.nandGate, 2);
    res.json(truthTable);
});

// NOR Gate Truth Table Route
router.get('/nor', (req, res) => {
    const truthTable = generateTruthTable(gateController.norGate, 2);
    res.json(truthTable);
});

// XOR Gate Truth Table Route
router.get('/xor', (req, res) => {
    const truthTable = generateTruthTable(gateController.xorGate, 2);
    res.json(truthTable);
});

// XNOR Gate Truth Table Route
router.get('/xnor', (req, res) => {
    const truthTable = generateTruthTable(gateController.xnorGate, 2);
    res.json(truthTable);
});

// BUFFER Gate Truth Table Route
router.get('/buffer', (req, res) => {
    const truthTable = generateTruthTable(gateController.bufferGate, 1);
    res.json(truthTable);
});

module.exports = router;
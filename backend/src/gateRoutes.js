const express = require('express');
const router = express.Router();
const gateController = require('./gateController');

//AND Gate Route
router.post('/and', (req, res) => {
    const { a, b } = req.body;
    const result = gateController.andGate(a, b);
    res.json({ input: { a, b }, output: result });  
});

//OR Gate Route
router.post('/or', (req, res) => {
    const { a, b } = req.body;
    const result = gateController.orGate(a, b);
    res.json({ input: { a, b }, output: result });
});     

//NOT Gate Route
router.post('/not', (req, res) => {
    const { a } = req.body;
    const result = gateController.notGate(a);
    res.json({ input: { a }, output: result });
});

//NAND Gate Route
router.post('/nand', (req, res) => {
    const { a, b } = req.body;
    const result = gateController.nandGate(a, b);
    res.json({ input: { a, b }, output: result });
});

//NOR Gate Route
router.post('/nor', (req, res) => {
    const { a, b } = req.body;
    const result = gateController.norGate(a, b);
    res.json({ input: { a, b }, output: result });
});

//XOR Gate Route
router.post('/xor', (req, res) => {
    const { a, b } = req.body;
    const result = gateController.xorGate(a, b);
    res.json({ input: { a, b }, output: result });
});

//XNOR Gate Route
router.post('/xnor', (req, res) => {
    const { a, b } = req.body;
    const result = gateController.xnorGate(a, b);
    res.json({ input: { a, b }, output: result });
});

module.exports = router;



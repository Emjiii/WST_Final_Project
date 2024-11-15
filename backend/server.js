const express = require('express');
const cors = require('cors');
const gateRoutes = require('./src/gateRoutes');
const app = express();
const PORT = 3000;

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for power switch states
let powerSwitchStates = {};

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Logic Gates Simulator</h1>');
});

app.use('/gates', gateRoutes);

// Endpoint to get the current state of a power switch
app.get('/api/power-switch/:id', (req, res) => {
    const { id } = req.params;
    const state = powerSwitchStates[id] || false; // Default to false if not set
    res.json({ state });
});

//use gateRoutes
app.use('/gates', gateRoutes);

app.post('/api/input-switch', (req, res) => {
    const { id, state } = req.body;
    powerSwitchStates[id] = state;
    console.log(`InputSwitch ${id} is now ${state ? 'ON' : 'OFF'}`);
    res.json({ success: true, message: `In ${id} updated` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

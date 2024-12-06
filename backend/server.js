const express = require('express');
const cors = require('cors');
const gateRoutes = require('./src/gates/gateRoutes');
const truthTableRoutes = require('./src/truthTable/truthTableRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://logic-gate-simulator-31edb.web.app', // Replace with your frontend URL
}));

// In-memory storage for power switch states
let powerSwitchStates = {};
const connections = [];

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Logic Gates Simulator</h1>');
});

app.use('/gates', gateRoutes);
app.use('/truth-table', truthTableRoutes);

app.post('/truth-table/circuit', truthTableRoutes);

// Endpoint to get the current state of a power switch
app.get('/api/power-switch/:id', (req, res) => {
    const { id } = req.params;
    const state = powerSwitchStates[id] || false; // Default to false if not set
    res.json({ state });
});

//use gateRoutes
//app.use('/gates', gateRoutes);

app.post('/api/input-switch', (req, res) => {
    const { id, state } = req.body;
    powerSwitchStates[id] = state;
    console.log(`InputSwitch ${id} is now ${state ? 'ON' : 'OFF'}`);
    res.json({ success: true, message: `In ${id} updated` });
});

app.get('/api/current-state/:id', (req, res) => {
    const { id } = req.params;
    const currentState = powerSwitchStates[id] || false; // Default to false if not set
    res.json({ state: currentState });
});

//Connection of handles
app.post('/api/connections', (req, res) => {
    try {
        const connectionData = req.body;
        
        // Add connection to storage
        connections.push(connectionData);
        
        console.log('New connection saved:', connectionData);
        
        res.status(200).json({
            message: 'Connection saved successfully',
            connection: connectionData
        });
    } catch (error) {
        console.error('Error saving connection:', error);
        res.status(500).json({ error: 'Failed to save connection' });
    }
});

// GET endpoint to retrieve all connections
app.get('/api/connections', (req, res) => {
    try {
        res.status(200).json(connections);
    } catch (error) {
        console.error('Error fetching connections:', error);
        res.status(500).json({ error: 'Failed to fetch connections' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

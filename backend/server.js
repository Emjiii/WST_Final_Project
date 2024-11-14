const express = require('express');
const cors = require('cors');
const gateRoutes = require('./src/gateRoutes');
const app = express();
const port = process.env.PORT||8080;

//middleware to handle cors
app.use(cors());

//middleware to parse JSON request bodies
app.use(express.json());

//Root route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Logic Gates Simulator</h1>');
});

app.get("/api", (req, res) => {
    res.json({users: ["tomato", "userTwo", "testing...", "try"]});
});

//use gateRoutes
app.use('/gates', gateRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!'});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//Logic Gate Endpoints
app.post('/api/and', (req, res) => {
    const {input1, input2} = req.body;
    const output = input1 && input2;
    res.json({output});
});

app.post('/api/or', (req, res) => {
    const {input1, input2} = req.body;
    const output = input1 || input2;
    res.json({output});
})

app.post('/api/not', (req, res) => {
    const {input} = req.body;
    const output = !input;
    res.json({output}); 
});



// app.get("/api", (req, res) =>{
//     res.json({"users": ["userOne", "userTwo", "userThree", "userFour", "testing...", "try"]})
// })

app.listen (PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});
const path = require('path');
const express = require('express');
const app = express();

const mockDataTickDesk = require('./mock/tickDesk.mock');
const mockDataTickPlan = require('./mock/tickPlan.mock');
const mockDataTickFact = require('./mock/tickFact.mock');

app.use(express.static('./public'));

app.get('/tick-desk-data', (req, res) => {
    res.send(mockDataTickDesk);

});
app.get('/tick-plan-data/:id', (req, res) => {
    res.send(mockDataTickPlan);

});
app.get('/tick-fact-data/:id', (req, res) => {
    res.send(mockDataTickFact);

});


app.listen(8080);

console.log('Server running on port 8080');
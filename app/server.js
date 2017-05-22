const db = require('./db/main.js');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(express.static('./public'));		
app.use(bodyParser.json());

const tickCtrl = require('./tick/tick.controller');
tickCtrl.setRoute(app);

const tickDeskCtrl = require('./tick-desk/tickDesk.controller');
tickDeskCtrl.setRoute(app);

app.listen(8080);

console.log('Server running on port 8080');


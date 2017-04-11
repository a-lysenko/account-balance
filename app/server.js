const db = require('./db/main.js');
const tickDeskCtrl = require('./tick-desk/tickDesk.controller');
const tickCtrl = require('./tick/tick.controller');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const mockDataTickDesk = require('./mock/tickDesk.mock');
const mockDataTickPlan = require('./mock/tickPlan.mock');
const mockDataTickFact = require('./mock/tickFact.mock');
const mockDataJugList = require('./mock/jugList.mock');

app.use(express.static('./public'));
app.use(bodyParser.json());

app.get('/tick-desk-data', (req, res) => {
    // TODO - remove mock tick desk data concat
    tickDeskCtrl.getAllTicks()
        .then((ticks) => {
            res.send(ticks.concat(mockDataTickDesk));
        });
});

app.get('/tick-plan-data/:id', (req, res) => {
    console.log('Got tick ID:', req.params.id);

    tickCtrl.getTick(req.params.id)
        .then((tick) => {
            res.send(tick);
        });

});
app.get('/tick-fact-data/:id', (req, res) => {
    res.send(mockDataTickFact);

});

app.get('/jug-list', (req, res) => {
	res.send(mockDataJugList);
});

app.route('/tick-new')
	.get((req, res) => {
        tickCtrl.getTickNew()
			.then((tickNew) => {
				res.send(tickNew);
			});
	})
	.post((req, res) => {
        tickCtrl.saveTick(req.body)
            .then((tickId) => {
                console.log('New tick was successfully saved!');
                res.send(tickId);
            });
	});



app.listen(8080);

console.log('Server running on port 8080');


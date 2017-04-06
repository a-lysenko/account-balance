const db = require('./db/main.js');
const tickDeskCtrl = require('./tick-desk/tickDesk.controller');

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
    res.send(mockDataTickPlan);

});
app.get('/tick-fact-data/:id', (req, res) => {
    res.send(mockDataTickFact);

});

app.get('/jug-list', (req, res) => {
	res.send(mockDataJugList);
});

app.route('/tick-new')
	.get((req, res) => {
		getTickNew()
			.then((tickNew) => {
				res.send(tickNew);
			})
			.catch((err) => {

			});
	})
	.post((req, res) => {
        const tickData = buildNewTickData(req.body);

        db.saveTick(tickData,
            (tickId) => {
                console.log('New tick was successfully saved!');
                res.send(tickId);
            });
	});


// TODO - create tick (mapper, controller and move there)
function buildNewTickData(data) {
    const spread = data.spread.map((item) => {
        return {
            id: item.id,
            plannedValue: item.value,
            plannedPercent: item.percent
        }
    });

    return {
        plannedValue: data.plannedValue,
        spread
    };
}

app.listen(8080);

console.log('Server running on port 8080');

function getTickNew() {
	const tickNew = {
		spread: getExtendedJugList()
	};

	return Promise.resolve(tickNew);

	function getExtendedJugList() {
		return mockDataJugList.map((jug) => {
			return Object.assign({},
				jug, 
				{
					value: 0,
					percent: 0
				});
		});
	}
}
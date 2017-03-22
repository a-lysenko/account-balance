const path = require('path');
const express = require('express');
const app = express();

const mockDataTickDesk = require('./mock/tickDesk.mock');
const mockDataTickPlan = require('./mock/tickPlan.mock');
const mockDataTickFact = require('./mock/tickFact.mock');
const mockDataJugList = require('./mock/jugList.mock');


const mockTickNewData = require('./mock/tickNew.mock');

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
		console.log('New tick was successfully saved!');
    	res.send(mockTickNewData);
	});




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
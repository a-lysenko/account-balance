const mockDataTickFact = require('../mock/tickFact.mock');
const mockDataJugList = require('../mock/jugList.mock');

function setup(tickCtrl, app) {
    app.route('/tick-plan-data/:id')
        .get(getTickPlanData)
        .put(updateTickPlanData);

    app.get('/tick-fact-data/:id', getTickFactData);

    app.get('/jug-list', getJugList);

    app.route('/tick-new')
        .get(getNewTick)
        .post(saveTick);


    function getTickPlanData(req, res) {
        tickCtrl.getTick(req.params.id)
            .then((tick) => {
                res.send(tick);
            });
    }

    function updateTickPlanData(req, res) {
        tickCtrl.updateTick(req.params.id, req.body)
            .then((tickId) => {
                console.log(`Tick (id ${req.params.id}) was successfully updated!`);
                res.send(tickId);
            });
    }

    function getTickFactData(req, res) {
        res.send(mockDataTickFact);
    }

    function getJugList(req, res) {
        res.send(mockDataJugList);
    }

    function getNewTick(req, res) {
        tickCtrl.getTickNew()
            .then((tickNew) => {
                res.send(tickNew);
            });
    }

    function saveTick(req, res) {
        tickCtrl.saveTick(req.body)
            .then((tickId) => {
                console.log('New tick was successfully saved!');
                res.send(tickId);
            });
    }
}
module.exports = {setup};
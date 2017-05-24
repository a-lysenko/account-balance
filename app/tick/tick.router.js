const mockDataTickFact = require('../mock/tickFact.mock');
const mockDataJugList = require('../mock/jugList.mock');

function setup(tickCtrl, app) {
    app.route('/tick-plan-data/:id')
        .get(getTick)
        .put(updateTick);

    app.get('/tick-fact-data/:id', getTickFactData);

    // TODO - later move it into separate component
    app.get('/jug-list', getJugList);

    app.route('/tick-new')
        .get(getNewTick)
        .post(saveTick);

    app.route('/tick/:id')
        .get(getTick) // duplicates method from '/tick-plan-data/:id'
        // TODO - switch FE to this url and remove previous implementation 
        .put(updateTick) // duplicates too
        .delete(removeTick);

    function getTick(req, res) {
        tickCtrl.getTick(req.params.id)
            .then((tick) => {
                res.send(tick);
            });
    }

    function updateTick(req, res) {
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

    function removeTick(req, res) {
        console.log('Tick Router. req.params.id', req.params.id);
        tickCtrl.removeTick(req.params.id)
            .then((tick) => {
                res.send(tick);
            });
    }
}
module.exports = {setup};
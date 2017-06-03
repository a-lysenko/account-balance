function setup(tickCtrl, app) {
    app.route('/tick-new')
        .get(getNewTick)
        .post(saveTick);

    app.route('/tick/:id')
        .get(getTick)
        .put(updateTick)
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
            })
            .catch((err) => {
                if (err.notFound) {
                    res.status(404).send(err.message);
                }
            });
    }
}
module.exports = {setup};
function setup(ctrl, app) {
    // TODO - remove mock tick desk data concat
    app.get('/tick-desk-data', (req, res) => {
        ctrl.getAllTicks()
            .then((ticks) => {
                res.send(ticks);
            });
    });
}
module.exports = {setup};
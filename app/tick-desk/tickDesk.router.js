const mockDataTickDesk = require('../mock/tickDesk.mock');

function setup(ctrl, app) {
    // TODO - remove mock tick desk data concat
    app.get('/tick-desk-data', (req, res) => {
        ctrl.getAllTicks()
            .then((ticks) => {
                res.send(ticks);
                // TODO - remove it if one is not needed
                //res.send(ticks.concat(mockDataTickDesk));
            });
    });
}
module.exports = {setup};
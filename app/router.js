const tickDeskCtrl = require('./tick-desk/tickDesk.controller');
const tickCtrl = require('./tick/tick.controller');

const mockDataTickDesk = require('./mock/tickDesk.mock');
const mockDataTickPlan = require('./mock/tickPlan.mock');
const mockDataTickFact = require('./mock/tickFact.mock');
const mockDataJugList = require('./mock/jugList.mock');

class Router {
    constructor(app) {
        this.app = app;
        
        this.handlers = this.currentHandlers;   

        app.get('/tick-desk-data', this.handlers.getTickDesk);

        app.route('/tick-plan-data/:id')
            .get(this.handlers.getTickPlanData)
            .put(this.handlers.updateTickPlanData);

        app.get('/tick-fact-data/:id', this.handlers.getTickFactData);

        app.get('/jug-list', this.handlers.getJugList);

        app.route('/tick-new')
            .get(this.handlers.getNewTick)
            .post(this.handlers.saveTick);
    }
    
    get currentHandlers() {
        return {
            getTickDesk(req, res) {
                // TODO - remove mock tick desk data concat
                tickDeskCtrl.getAllTicks()
                    .then((ticks) => {
                        res.send(ticks);
                            // TODO - remove it if one is not needed
                            //res.send(ticks.concat(mockDataTickDesk));
                    });
            },
            getTickPlanData(req, res) {
                tickCtrl.getTick(req.params.id)
                    .then((tick) => {
                        res.send(tick);
                    });
            },
            updateTickPlanData(req, res) {
                tickCtrl.updateTick(req.params.id, req.body)
                    .then((tickId) => {
                        console.log(`Tick (id ${req.params.id}) was successfully updated!`);
                        res.send(tickId);
                    });
            },
            getTickFactData(req, res) {
                res.send(mockDataTickFact);
            },
            getJugList(req, res) {
                res.send(mockDataJugList);
            },
            getNewTick(req, res) {
                tickCtrl.getTickNew()
                    .then((tickNew) => {
                        res.send(tickNew);
                    });
            },
            saveTick(req, res) {
                tickCtrl.saveTick(req.body)
                    .then((tickId) => {
                        console.log('New tick was successfully saved!');
                        res.send(tickId);
                    });
            }
        }
    }
    // set currentHandlers(value) 
    //     console.log('"handlers" can not be replaced.');
    // }

    defineHandlers(handlers) {
        // function isHandlerDefined(name) {

        // }
    }
}

module.exports = Router;

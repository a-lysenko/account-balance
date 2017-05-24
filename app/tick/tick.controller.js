const tickMapper = require('./mapper');
const db = require('../db/main.db');

const mockDataJugList = require('../mock/jugList.mock');

const tickRouter = require('./tick.router');

class TickController {
    constructor() {}

    setRoute(app) {
        const ctrl = this;
        tickRouter.setup(ctrl, app);
    }

    getTick(tickId) {
        const promise = new Promise((resolveFn, rejectFn) => {

            // TODO - replace callback interface of 'saveTick' with promise. This code is evidence it should be done
            db.getTick(tickId,
                (dbTickData) => {
                    const clientTick = tickMapper.buildClientTick(dbTickData);

                    resolveFn(clientTick);
                },
                rejectFn);
        });

        return promise;
    }

    getTickNew() {
        const tickNew = db.getEmptyTick();
        tickNew.spread = getExtendedJugList();

        return Promise.resolve(tickNew);

        function getExtendedJugList() {
            // TODO - replace with real data (for instance from some user settings)
            return mockDataJugList.map((jug) => {
                return Object.assign({},
                    jug,

                    // TODO - use mongoose to create an empty tick instance and fill "spread"
                    // with as many items as there items in "mockDataJugList", but based 
                    // on "spreadItemSchema" and extended by appropriate "mockDataJugList" values 
                    // (without id and so on)
                    {
                        plannedValue: 0,
                        plannedPercent: 0
                    });
            });
        }
    }

    saveTick(clientTickData) {
        const dbTickData = tickMapper.buildTickData(clientTickData);

        const promise = new Promise((resolveFn, rejectFn) => {

            // TODO - repace callback interface of 'saveTick' with promise. This code is evidence it should be done
            db.saveTick(dbTickData, resolveFn, rejectFn);
        });

        return promise;
    }

    updateTick(tickId, clientTickData) {
        const dbTickData = tickMapper.buildTickData(clientTickData);

        return new Promise((resolveFn, rejectFn) => {

            // TODO - replace callback interface of 'updateTick' with promise. This code is evidence it should be done
            db.updateTick(tickId, dbTickData, resolveFn, rejectFn);
        });
    }

    removeTick(tickId) {
        const promise = new Promise((resolveFn, rejectFn) => {

            // TODO - replace callback interface of 'removeTick' with promise. This code is evidence it should be done
            db.removeTick(tickId,
                (dbTickData) => {
                    const clientTick = tickMapper.buildClientTick(dbTickData);

                    resolveFn(clientTick);
                },
                rejectFn);
        });

        return promise;
    }
}

module.exports = new TickController();
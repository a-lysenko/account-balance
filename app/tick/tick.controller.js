const tickMapper = require('./mapper');
const db = require('../db/main');

const mockDataJugList = require('../mock/jugList.mock');

class TickController {
    constructor() {}

    saveTick(clientTickData) {
        const dbTickData = tickMapper.buildNewTickData(clientTickData);

        const promise = new Promise((resolveFn, rejectFn) => {

            // TODO - repace callback interface of 'saveTick' with promise. This code is evidence it should be done
            db.saveTick(dbTickData, resolveFn, rejectFn);
        });

        return promise;
    }

    getTickNew() {
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

    getTick(tickId) {
        const promise = new Promise((resolveFn, rejectFn) => {

            // TODO - replace callback interface of 'saveTick' with promise. This code is evidence it should be done
            db.getTick(tickId,
                (dbTickData) => {
                    const clientTick = tickMapper.buildClientTick(dbTickData, mockDataJugList);

                    resolveFn(clientTick);
                },
                rejectFn);
        });

        return promise;
    }

}

module.exports = new TickController();
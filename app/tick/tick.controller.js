const tickMapper = require('./mapper');
const db = require('../db/main');

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

}

module.exports = new TickController();
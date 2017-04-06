const tickDeskMapper = require('./mapper');
const db = require('../db/main');

class TickDeskController {
    constructor() {}

    getAllTicks() {
        const promise = new Promise((resolveFn, rejectFn) => {

            // TODO - repace callback interface of 'getAllTicks' with promise. This code is evidence it should be done
            db.getAllTicks((dbTicks) => {
                const clientTickDesk = tickDeskMapper.buildClientTickDesk(dbTicks);

                resolveFn(clientTickDesk);
            }, rejectFn);
        });

        return promise;
    }

}

module.exports = new TickDeskController();
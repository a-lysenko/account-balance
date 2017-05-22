const db = require('../db/main');

const tickDeskMapper = require('./mapper');
const tickDeskRouter = require('./tickDesk.router');

class TickDeskController {
    constructor() {}

    setRoute(app) {
        const ctrl = this;
        tickDeskRouter.setup(ctrl, app);
    }

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
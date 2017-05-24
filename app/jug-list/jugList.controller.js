// const db = require('../db/main.db');
const mockDataJugList = require('../mock/jugList.mock');

const jugListRouter = require('./jugList.router');

class JugListController {
    constructor() {}

    setRoute(app) {
        const ctrl = this;
        jugListRouter.setup(ctrl, app);
    }

    getJugList() {
        return Promise.resolve(mockDataJugList);
    }
}

module.exports = new JugListController();
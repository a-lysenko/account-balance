const mongoose = require('mongoose');
const {mLabURL} = require('./configuration');
console.log('mLabURL', mLabURL);

mongoose.Promise = global.Promise;

const TickModel = require('./ticks/tick.model.js')(mongoose);

const tickDBController = require('./ticks/tick.db.controller')(TickModel);

mongoose.connect(mLabURL);
const db = mongoose.connection;

db.on('error', (...args) => {
    console.log('Error. args', args);

});

db.once('open', () => {
    console.log('Successfully connected to database.');

});

exports.getAllTicks = tickDBController.getAllTicks;
exports.getTick     = tickDBController.getTick;
exports.saveTick    = tickDBController.saveTick;
exports.updateTick  = tickDBController.updateTick;
exports.removeTick  = tickDBController.removeTick;

exports.getEmptyTick = () => {
    return new TickModel({});
};

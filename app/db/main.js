const mongoose = require('mongoose');
const {mLabURL} = require('../configuration');
console.log('mLabURL', mLabURL);

mongoose.Promise = global.Promise;

const TickModel = require('./tick.model.js')(mongoose);

mongoose.connect(mLabURL);
const db = mongoose.connection;

db.on('error', (...args) => {
    console.log('Error. args', args);

});

db.once('open', () => {
    console.log('Successfully connected to database.');

});

exports.saveTick = (tickData, successCb) => {
    const tick = new TickModel(tickData);
    tick.save((err) => {
        if (err) {
            console.log('err on save', err);
            return;
        }

        console.log('Tick saved successfully. tick._id', tick._id);
        successCb(tick._id);
    });
};

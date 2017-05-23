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

exports.getAllTicks = (successCb, errorCb) => {
    TickModel.find((err, ticks) => {
        if (err) {
            console.log('err on get all ticks', err);
            errorCb(err);
            return;
        }

        console.log('Ticks were gotten successfully. amount of ticks', ticks.length);
        if (ticks.length) {
            console.log('First tick', ticks[0]);
        }

        if (successCb) {
            successCb(ticks);
        }
    })
};

exports.getTick = (tickId, successCb, errorCb) => {
    TickModel.findById(tickId, (err, tick) => {
        if (err) {
            console.log(`err on get tick by ID (${tickId})`, err);
            errorCb(err);
            return;
        }

        console.log(`Tick was gotten by ID ${tickId} successfully: ${tick}`);
        if (successCb) {
            successCb(tick);
        }
    });
};

exports.saveTick = (tickData, successCb, errorCb) => {
    const tick = new TickModel(tickData);
    tick.save((err) => {
        if (err) {
            console.log('err on save tick', err);
            errorCb(err);
            return;
        }

        console.log('Tick saved successfully. tick._id', tick._id);
        successCb(tick._id);
    });
};

exports.updateTick = (tickId, tickData, successCb, errorCb) => {
    //const tick = new TickModel(tickData);
    TickModel.findByIdAndUpdate(tickId, tickData, (err, updatedTick) => {
        if (err) {
            console.log('err on update tick', err);
            errorCb(err);
            return;
        }

        console.log('Tick updated successfully. tick._id', updatedTick._id);

        successCb(updatedTick._id);
    });
};

exports.removeTick = (tickId, successCb, errorCb) => {
    TickModel.findByIdAndRemove(tickId, (err, tick) => {
        if (err) {
            console.log(`err on remove tick by ID (${tickId})`, err);
            errorCb(err);
            return;
        }

        console.log(`Tick with ID ${tickId} was removed successfully: ${tick}`);
        if (successCb) {
            successCb(tick);
        }
    })
}

exports.getEmptyTick = () => {
    return new TickModel({});
}

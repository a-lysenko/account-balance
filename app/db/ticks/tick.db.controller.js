let TickModel;

class TickDBController {
    constructor(_TickModel) {
        TickModel = _TickModel;
    }

    getAllTicks(successCb, errorCb) {
        TickModel.find((err, ticks) => {
            if (err) {
                console.log('err on get all ticks', err);
                errorCb(err);
                return;
            }

            console.log('Ticks were gotten successfully. amount of ticks', ticks.length);

            if (successCb) {
                successCb(ticks);
            }
        })
    }

    getTick(tickId, successCb, errorCb) {
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
    }

    saveTick(tickData, successCb, errorCb) {
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
    }

    updateTick(tickId, tickData, successCb, errorCb) {
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

    removeTick(tickId, successCb, errorCb) {
        TickModel.findByIdAndRemove(tickId, (err, tick) => {
            if (err) {
                console.log(`err on remove tick by ID (${tickId})`, err);
                errorCb(err);
                return;
            }

            if (tick === null) {
                console.log(`Err. Tick with ID ${tickId} was not found to remove: ${tick}`);
                if (errorCb) {
                    const error = {
                        notFound: true
                        //query: [`id: ${tickId}`]
                    };
                    errorCb(error);
                }
                return;
            }

            console.log(`Tick with ID ${tickId} was removed successfully: ${tick}`);
            if (successCb) {
                successCb(tick);
            }
        })
    }
}

module.exports = (TickModel) => {
    return new TickDBController(TickModel);
};



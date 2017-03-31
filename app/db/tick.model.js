module.exports = (mongoose) => {
    //const Schema = mongoose.Schema;

    const tickSchema = {
        //id: String,

        plannedDate: {type: Date, default: Date.now},
        plannedValue: Number,
        factedDate: {type: Date, default: Date.now},
        factedValue: {type: Number, default: 0},
        factedPercent: {type: Number, default: 0},
        spread: [{
            id: String,
            plannedValue: Number,
            plannedPercent: Number,
            factedValue: {type: Number, default: 0},
            factedPercent: {type: Number, default: 0}
        }]


        // TODO - add medals/achievements
    };

    return mongoose.model('Tick', tickSchema);
};
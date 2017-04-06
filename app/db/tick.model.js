module.exports = (mongoose) => {
    //const Schema = mongoose.Schema;

    const statuses = ['great', 'poor', 'good', ''];

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
        }],
        //tickStatus: {type: String, enum: statuses},
        tickStatus: {type: String, default: ''},
        medals: [/*{
            icon: 'balancer',
            title: 'Balancer'
        }...*/]
    };

    return mongoose.model('Tick', tickSchema);
};
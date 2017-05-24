module.exports = (mongoose) => {
    const Schema = mongoose.Schema;

    const statuses = ['great', 'poor', 'good', ''];

    const spreadItemSchema = new Schema({ 
        name: String,
        defaultPercent: Number,

        plannedValue: Number,
        plannedPercent: Number,

        factedValue: {type: Number, default: 0},
        factedPercent: {type: Number, default: 0}
    });

    const tickSchema = {
        //id: String,

        plannedValue: Number,
        factedValue: {type: Number, default: 0},

        factedPercent: {type: Number, default: 0},

        spread: [spreadItemSchema],

        plannedDate: {type: Date, default: Date.now},
        factedDate: {type: Date, default: Date.now},
        
        //tickStatus: {type: String, enum: statuses},
        tickStatus: {type: String, default: ''},
        medals: [/*{
            icon: 'balancer',
            title: 'Balancer'
        }...*/]
    };

    return mongoose.model('Tick', tickSchema); // collection name: "ticks" - from name of the model
};
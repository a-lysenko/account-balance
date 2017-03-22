const shortid = require('js-shortid');

const mockPlanData = {
    id: shortid.gen(),
    plannedValue: 12345.67,
    factedPercent: 46,
    spread: [
        {
            name: 'jug-' + shortid.gen().slice(-2),
            defaultPercent: 51,
            value: 4321.05,
            percent: 43.21
        },
        {
            name: 'jug-' + shortid.gen().slice(-2),
            defaultPercent: 52,
            value: 4321.06,
            percent: 43.2
        }
    ]
};

module.exports = mockPlanData;
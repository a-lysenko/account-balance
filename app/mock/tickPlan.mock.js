const shortid = require('js-shortid');

const mockPlanData = {
    id: shortid.gen(),
    plannedValue: 12345.67,
    factedPercent: 46,
    spread: [
        {
            jugName: 'jug-' + shortid.gen().slice(-2),
            jugDefaultPercent: 51,
            jugValue: 4321.05,
            jugPercent: 43.21
        },
        {
            jugName: 'jug-' + shortid.gen().slice(-2),
            jugDefaultPercent: 52,
            jugValue: 4321.06,
            jugPercent: 43.2
        }
    ]
};

module.exports = mockPlanData;
const shortid = require('js-shortid');

const mockFactData = {
    id: shortid.gen(),
    plannedValue: 12345.67,
    factedValue: 1234.5,
    factedPercent: 12.34,
    leftValue: 123.45,
    leftPercent: 12.09,
    prevLeftValue: 123.4,
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

module.exports = mockFactData;
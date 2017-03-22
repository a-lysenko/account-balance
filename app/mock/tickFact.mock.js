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
            id: 'wzpJs7bIv4',
            name: 'jug-' + shortid.gen().slice(-2),
            defaultPercent: 51,
            value: 4321.05,
            percent: 43.21
        },
        {
            id: 'wzqGwYQavP',
            name: 'jug-' + shortid.gen().slice(-2),
            defaultPercent: 52,
            value: 4321.06,
            percent: 43.2
        }
    ]
};

module.exports = mockFactData;
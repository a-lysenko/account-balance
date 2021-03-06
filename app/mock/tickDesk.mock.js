const shortid = require('js-shortid');

const mockDeskData = [
    {
        id: shortid.gen(),
        plannedDate: new Date(),
        factedDate: new Date(),
        plannedValue: 12345.67,
        unfactedValue: 1234.56,
        factedPercent: 48,
        tickStatus: 'great',
        medals: [
            {
                icon: 'balancer',
                title: 'Balancer'
            },
            {
                icon: 'gold',
                title: '3 good or better in row'
            }
        ]
    },
    {
        id: shortid.gen(),
        plannedDate: new Date(),
        factedDate: new Date(),
        plannedValue: 12345.67,
        unfactedValue: 1234.56,
        factedPercent: 48,
        tickStatus: 'good',
        medals: [
            {
                icon: 'gold',
                title: '3 good or better in row'
            }
        ]
    },
    {
        id: shortid.gen(),
        plannedDate: new Date(),
        factedDate: new Date(),
        plannedValue: 12345.67,
        unfactedValue: 1234.56,
        factedPercent: 48,
        tickStatus: 'poor',
        medals: []
    },
    {
        id: shortid.gen(),
        plannedDate: new Date(),
        factedDate: new Date(),
        plannedValue: 12345.67,
        unfactedValue: 1234.56,
        factedPercent: 48,
        tickStatus: '',
        medals: [
            {
                icon: 'balancer',
                title: 'Balancer'
            },
            {
                icon: 'red',
                title: 'First blood! first closed tick as good or better'
            }
        ]
    }
];

module.exports = mockDeskData;
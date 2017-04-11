function buildNewTickData(clientData) {
    const spread = clientData.spread.map((item) => {
        return {
            id: item.id,
            plannedValue: item.value,
            plannedPercent: item.percent
        }
    });

    return {
        plannedValue: clientData.plannedValue,
        spread
    };
}

function buildClientTick(dbTickData, jugList) {
    // TODO - move to some common block. Use Map probably
    const jugCollection = jugList.reduce((collection, jugItem) => {
        collection[jugItem.id] = jugItem;

        return collection;
    }, {});

    const spread = dbTickData.spread.map((item) => {
        const jugItem = jugCollection[item.id];

        return {
            id: item.id,
            name: jugItem.name,
            defaultPercent: jugItem.defaultPercent,
            value: item.plannedValue,
            percent: item.plannedPercent
        }
    });

    return {
        id: dbTickData._id,
        plannedValue: dbTickData.plannedValue,
        spread
    }
}

exports.buildNewTickData = buildNewTickData;
exports.buildClientTick = buildClientTick;
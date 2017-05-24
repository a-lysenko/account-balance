function buildTickData(clientData) {
    const spread = clientData.spread.map((item) => {
        return {
            name: item.name,
            defaultPercent: item.defaultPercent,

            plannedValue: item.plannedValue,
            plannedPercent: item.plannedPercent,
            
            factedValue: item.factedValue,
            factedPercent: item.factedPercent
        }
    });

    return {
        plannedValue: clientData.plannedValue,
        factedValue: clientData.factedValue,

        factedPercent: clientData.factedPercent,

        // TODO - fill the next (probably including some conditions)
        // plannedDate
        // factedDate

        spread
    };
}

function buildClientTick(dbTickData) {
    const spread = dbTickData.spread.map((item) => {

         return {
            // TOOD - remove || after data will be valid
            name: item.name || 'no name',
            defaultPercent: item.defaultPercent || 0,

            plannedValue: item.plannedValue,
            plannedPercent: item.plannedPercent,

            factedValue: item.factedValue,
            factedPercent: item.factedPercent
        }
    });

    return {
        id: dbTickData._id,
        plannedValue: dbTickData.plannedValue,
        factedValue: dbTickData.factedValue,

        factedPercent: dbTickData.factedPercent,
        spread
    }
}

exports.buildTickData = buildTickData;

exports.buildClientTick = buildClientTick;
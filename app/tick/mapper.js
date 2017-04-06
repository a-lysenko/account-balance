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

exports.buildNewTickData = buildNewTickData;
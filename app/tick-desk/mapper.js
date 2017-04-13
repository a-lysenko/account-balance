function buildClientTickItem(dbDataItem) {
//    {
//        id: <string>, // get from _id
//        plannedDate: <date>, // is in db
//        factedDate: <date>, // is in db
//        plannedValue: <number>, // is in db
//        unfactedValue: <number>, // calculate
//        factedPercent: <number>, // is in db
//        tickStatus: <string - enum>, // "great", etc
//        medals: [
//            {
//                icon: <string - enum>, // "balancer" etc,
//                title: <string>, // "Balancer"
//            } ...
//        ]
//}

    return {
        id: dbDataItem._id, // get from _id
        plannedDate: dbDataItem.plannedDate, // is in db
        factedDate: dbDataItem.factedDate, // is in db
        plannedValue: dbDataItem.plannedValue, // is in db
        unfactedValue: dbDataItem.plannedValue - dbDataItem.factedValue, // calculate
        factedPercent: dbDataItem.factedPercent, // is in db
        tickStatus: dbDataItem.tickStatus, // "great", etc
        medals: dbDataItem.medals
    }
}

function buildClientTickDesk(dbDataTicks) {
    return dbDataTicks.map(buildClientTickItem);
}

exports.buildClientTickDesk = buildClientTickDesk;
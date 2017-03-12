const mongoose = require('mongoose');
const {mLabURL} = require('../configuration');
console.log('mLabURL', mLabURL);

mongoose.connect(mLabURL);
const db = mongoose.connection;

db.on('error', (...args) => {
    console.log('Error. args', args);

});

db.once('open', (...args) => {
    console.log('Success. args', args);

});
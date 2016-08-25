#!/usr/bin/env node

var catw = require('catw');
var fs = require('fs');

catw(['public/components/*.module.js',
    'public/components/*.route.js',
    'public/components/**/!(*spec).js'], {watch: false},  function (stream) {
    var w = stream.pipe(fs.createWriteStream('bundle.js'));
    w.on('close', function () { console.log('wrote to bundle.js') });
});
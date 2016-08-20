var fs = require('fs');
var bundleStyles = require('./bundle-styles');

var watchOptions = {
    recursive: true
};

var watchListener = function (event, filename) {
    if (filename.match(/.+\.scss$/)) {
        bundleStyles();
    }
};

bundleStyles();
fs.watch('./src', watchOptions, watchListener);
var fs = require('fs');
var bundleStyles = require('./bundle-styles');
var configStyle = require('./config').style;


var watchOptions = {
    recursive: true
};

var watchListener = function (event, filename) {
    if (filename.match(/.+\.scss$/)) {
        bundleStyles(configStyle);
    }
};

bundleStyles(configStyle);
fs.watch(configStyle.src, watchOptions, watchListener);
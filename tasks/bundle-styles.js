var nodeSass = require('node-sass');
var fs = require('fs');

var sassResultCb = function (err, result) {
    if (err) {
        console.error('Compiling SCSS -> CSS failed. Reason:', err);
        return;
    }

    // TODO - move to config
    if (!fs.existsSync('./public/css')){
        fs.mkdirSync('./public/css');
    }

    fs.writeFile(this.options.outFile, result.css, (err) => {
        if (err) throw err;

        console.log('Compiling SCSS -> CSS finished. (duration:', result.stats.duration, 'ms)');
    });

    fs.writeFile(this.options.sourceMap, result.map, (err) => {
        if (err) throw err;

        console.log('SCSS -> CSS source map created');
    });
};

module.exports = (config) => {
    var filePath = [config.src, config.file].join('/');
    var outFilePath = [config.dist, config.outFile].join('/');

    nodeSass.render({
        file: filePath,
        outFile: outFilePath,
        sourceMap: config.sourceMap
    }, sassResultCb);
};
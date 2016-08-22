var nodeSass = require('node-sass');
var fs = require('fs');

module.exports = (config) => {
    var filePath = [config.src, config.file].join('/');
    var outFilePath = [config.dist, config.outFile].join('/');

    nodeSass.render({
        file: filePath,
        outFile: outFilePath,
        sourceMap: config.sourceMap
    }, sassResultCb);

    function sassResultCb(err, result) {
        if (err) {
            console.error('Compiling SCSS -> CSS failed. Reason:', err);
            return;
        }

        if (!fs.existsSync(config.dist)){
            fs.mkdirSync(config.dist);
        }

        fs.writeFile(this.options.outFile, result.css, (err) => {
            if (err) throw err;

            console.log('Compiling SCSS -> CSS finished. (duration:', result.stats.duration, 'ms)');
        });

        fs.writeFile(this.options.sourceMap, result.map, (err) => {
            if (err) throw err;

            console.log('SCSS -> CSS source map created');
        });
    }
};
var nodeSass = require('node-sass');
var fs = require('fs');

var sassResultCb = function (err, result) {
    if (err) {
        console.error('Compiling SCSS -> CSS failed. Reason:', err);
        return;
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

nodeSass.render({
    file: './src/style.scss',
    outFile: './public/style.css',
    sourceMap: true
}, sassResultCb);
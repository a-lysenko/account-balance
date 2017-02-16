const fsE = require('fs-extra');
const path = require('path');
const watch = require('gulp-watch');

function copyIndex(config) {
    const distFileName = path.join(config.dist, config.outFile);

    fsE.copy(config.src, distFileName, (err) => {
        if (err) {
            console.log('Task "copy-index" has errors:', err);
            return;
        }

        console.log('Task "copy-index": done.');
    });
}

module.exports = (config) => {
    function exec() {
        copyIndex(config);
    }

    return {
        exec: exec,
        watch: () => {
            watch(config.src, exec);
        }
    }
};

const fsE = require('fs-extra');
const path = require('path');
const watch = require('watch');

function copyIndex(config) {
    const srcFileName = path.join(config.src, config.fileName);
    const distFileName = path.join(config.dist, config.fileName);

    fsE.copy(srcFileName, distFileName, (err) => {
        if (err) {
            console.log('Task "copy-index" has errors:', err);
            return;
        }

        console.log('Task "copy-index": done.');
    });
}

module.exports = (config) => {
    function exec() {
        console.log('Index updated!');
        copyIndex(config);
    }

    return {
        exec: exec,
        watch: () => {
            function filterFiles(fileName) {
                const {base: fileBase, dir: fileDir} = path.parse(fileName);
                const {fileName: srcFileBase, src: srcFileDir} = config;

                return fileBase === srcFileBase
                    && fileDir === srcFileDir;
            }

            watch.watchTree(config.src, {filter: filterFiles}, exec);
        }
    }
};

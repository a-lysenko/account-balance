const fsE = require('fs-extra');
const path = require('path');

const config = require('./config').index;
const taskName = 'copy-index';

function copyIndex() {
    const srcFileName = path.join(config.src, config.fileName);
    const distFileName = path.join(config.dist, config.fileName);

    fsE.copy(srcFileName, distFileName, (err) => {
        if (err) {
            console.log(`Task "${taskName}" has errors:`, err);
            return;
        }

        console.log(`Task "${taskName}": done.`);
    });
}

module.exports = {
    exec: copyIndex,
    pattern: config.watchPattern,
    name: taskName
};

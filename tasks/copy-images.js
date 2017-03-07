const glob = require('glob');
const fsE = require('fs-extra');
const path = require('path');

const config = require('./config').images;
const taskName = 'copy-images';

function copyImages() {
    glob(config.src, {}, (err, files) => {
        if (err) {
            console.log(`Task "${taskName}" has errors:`, err);
            return;
        }

        console.log(`Task "${taskName}" found (${files.length}) file(s):`+
            `\n\t ${files.join('\n\t')}`);

        let amountOfFinished = 0;
        let errorOcurred = false;

        files.forEach((file) => {
            if (errorOcurred) {
                return;
            }

            const distFileName = path.join(config.dist, path.basename(file));

            fsE.copy(file, distFileName, (err) => {
                if (err) {
                    console.log(`Task "${taskName}" has errors:`, err);
                    errorOcurred = true;
                    return;
                }

                amountOfFinished++;
                if (amountOfFinished === files.length) {
                    console.log(`Task "${taskName}": done. All files copied.`);
                }
            });

        });
    })
}

module.exports = {
    exec: copyImages,
    pattern: config.watchPattern,
    name: taskName
};

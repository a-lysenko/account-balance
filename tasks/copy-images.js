const glob = require('glob');
const fsE = require('fs-extra');
const path = require('path');
var watch = require('gulp-watch');

function copyImages(config) {
    glob(config.src, {}, (err, files) => {
        if (err) {
            console.log('Task "copy-images" has errors:', err);
            return;
        };

        console.log(`Task "copy-images" found (${files.length}) file(s):`+
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
                    console.log('Task "copy-images" has errors:', err);
                    errorOcurred = true;
                    return;
                }

                amountOfFinished++;
                if (amountOfFinished === files.length) {
                    console.log('Task "copy-images": All files copied.');
                }
            });

        });
    })
}

module.exports = (config) => {
    function exec() {
        copyImages(config);
    }

    return {
        exec: exec,
        watch: () => {
            watch(config.src, exec);
        }
    }
};

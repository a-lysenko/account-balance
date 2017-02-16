var config = require('./config');

var copyIndex = require('./copy-index');
var concatCSS = require('./concat-css');
var concatJS = require('./concat-js');
var cacheTemplates = require('./cache-templates');
var copyImages = require('./copy-images');

var tasks = {
    copyIndex: copyIndex(config.index),
    concatCSS: concatCSS(config.style),
    concatJS: concatJS(config.js),
    cacheTemplates: cacheTemplates(config.templates),
    copyImages: copyImages(config.images)
};

// w - watch
// o - optional list of tasks
// noexec - no execution, can be used to start watch without initial exec
var options = ['w', 'o', 'noexec'];

var params = parseParams();

var taskNames = params.o || Object.keys(tasks);
taskNames.forEach((taskName) => {
    if (tasks[taskName]) {
        if (!params.noexec) {
            tasks[taskName].exec();
            console.log('Task "' + taskName + '" exec');
        }

        if (params.w) {
            tasks[taskName].watch();
            console.log('Task "' + taskName + '" watch');
        }
    }
});

function parseParams() {
    var bufferedOption = null;

    return process.argv.reduce((accum, val) => {
        var param = getParam(val);

        if (~options.indexOf(param)) {
            bufferedOption = param;
            accum[param] = [];
        } else {
            if (bufferedOption) {
                accum[bufferedOption] = accum[bufferedOption].concat(val.split(','));
            }
        }

        return accum;
    }, {});

    function getParam(value) {
        var matcher = value.match(/^--(\w+)$/);
        return matcher && matcher[1];
    }
}



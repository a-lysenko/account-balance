//var config = require('./config');

const copyIndex = require('./copy-index');
const concatCSS = require('./concat-css');
const concatJS = require('./concat-js');
const cacheTemplates = require('./cache-templates');
const copyImages = require('./copy-images');

const tasks = {
    [copyIndex.name]: copyIndex,
    [concatCSS.name]: concatCSS,
    [concatJS.name]: concatJS,
    [cacheTemplates.name]: cacheTemplates,
    [copyImages.name]: copyImages
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
            console.log('Task "' + taskName + '" exec');
            tasks[taskName].exec();
        }

        //if (params.w) {
        //    tasks[taskName].watch();
        //    console.log('Task "' + taskName + '" watch');
        //}
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



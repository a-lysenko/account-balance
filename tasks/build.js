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

const optionalTasks = parseOptionalTasks();

var taskNames = optionalTasks || Object.keys(tasks);
taskNames.forEach((taskName) => {
    if (tasks[taskName]) {
        console.log(`Task "${taskName}" exec`);
        tasks[taskName].exec();
    }
});

function parseOptionalTasks() {
    // o - optional list of tasks
    const optionName = 'o';
    let optionCaptured = false;

    return process.argv.reduce((optionalTasks, val) => {
        var param = getParam(val);

        if (param === optionName) {
            optionCaptured = true;
            optionalTasks = [];
        } else {
            if (optionCaptured) {
                optionalTasks = optionalTasks.concat(val.split(',').map(item => item.trim()))
            }
        }

        return optionalTasks;
    }, []);

    function getParam(value) {
        var matcher = value.match(/^--(\w+)$/);
        return matcher && matcher[1];
    }
}

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
const taskNames = optionalTasks || Object.keys(tasks);

taskNames.forEach((taskName) => {
    if (tasks[taskName]) {
        console.log(`Task "${taskName}" exec`);
        tasks[taskName].exec();
    }
});

function parseOptionalTasks() {
    // o - optional list of tasks
    const optionName = '--o';
    let optionCaptured = false;
   
    let optionalTasks = process.argv.reduce((optionalTasks, val) => {
        if (val === optionName) {
            optionCaptured = true;
            optionalTasks = [];
        } else {
            if (optionCaptured) {
                optionalTasks.push(val);
            }
        }

        return optionalTasks;
    }, []);

    if (!optionCaptured) {
        optionalTasks = undefined;
    }

    return optionalTasks;
}

const watch = require('watch');
const minimatch = require('minimatch');
const normalize = require('normalize-path');

const rootDir = 'src';

const copyIndex = require('./copy-index');
const concatCSS = require('./concat-css');
const concatJS = require('./concat-js');
const cacheTemplates = require('./cache-templates');
const copyImages = require('./copy-images');

const config = [
	copyIndex,
	concatCSS,
	concatJS,
	cacheTemplates,
	copyImages
];

// WATCH MODULE
console.log('Tasks under watch:', config.map(item => item.name));

watch.watchTree(rootDir, {interval: 1.5}, (fileName, currStat, prevStat) => {
	let fileNames = [];

	if (typeof fileName === 'object') {
		fileNames = Object.keys(fileName).map(normalize);
	}

	if (typeof fileName === 'string') {
		fileNames = [normalize(fileName)];
	}

	console.log('fileNames', fileNames);

	function getTasksToFire(taskArr, fileNames) {
		return taskArr
			.filter((task) => {
				const match = fileNames.some((fileName) => {
					return minimatch(fileName, task.pattern);
				});

				if (!match) {
					console.log('pattern', task.pattern, 'not active. Task', task.name);
				}

				return match;
			})
			.map((task) => {
				return task.exec;
			});
	}

	const tasksToFire = getTasksToFire(config, fileNames);

	tasksToFire
		.forEach((task) => {
			task();
		});
});
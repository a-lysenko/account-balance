const watch = require('watch');
const minimatch = require('minimatch');
const normalize = require('normalize-path')

const config = [
	{
		pattern: 'src/index.html',
		name: 'copy-index',
		task: () => {
			console.log('index task done');
		}
	},
	{
		pattern: 'src/**/*.js',
		name: 'concat-js',
		task: () => {
			console.log('js task done');
		}
	},
	{
		pattern: 'src/**/*.png',
		name: 'copy-images',
		task: () => {
			console.log('image task done');
		}
	}
];

// WATCH MODULE
const watcher = watchModule();
watcher(config);

function watchModule() {
	return function (config) {
		console.log('Tasks under watch:', config.map(item => item.name));

		watch.watchTree('src', (fileName, currStat, prevStat) => {
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
					return task.task;
				});
		}

		const tasksToFire = getTasksToFire(config, fileNames);

		tasksToFire
			.forEach((task) => {
				task();
			});
		})
	}
}
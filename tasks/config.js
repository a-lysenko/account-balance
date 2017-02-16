module.exports = {
    style: {
        src: 'src/**/*.scss',
        dist: 'public/css',
        outFile: 'style.css',
        watchSrc: 'src/scss/**/*.scss'
    },
    js: {
        srcFiles: [
            'src/js/!(*.spec).js',
            'src/components/acc.module.js',
            'src/components/acc.route.js',
            'src/components/**/!(*.spec).js'
        ],
        dist: 'public/js',
        outFile: 'script.js'
    },
    templates: {
        src: 'src/components/**/*.html',
        dist: 'public/js',
        outFile: 'templates.js',
        moduleName: 'acc'
    },
    index: {
        src: 'src/index.html',
        dist: 'public',
        outFile: 'index.html'
    },
    images: {
        src: 'src/**/*.png',
        dist: 'public/images'
    }
};

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'browserify'],
        files: [
            // 'src/app/**/*.js',
            'spec/**/*.spec.js'
        ],
        preprocessors: {
            '**/src/app/*.js': ['coverage'],
        },
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-browserify'
        ],
        reporters: ['progress', 'coverage'],
        port: 9800,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autowatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        coverageReporter: {
            includeAllSources: true,
            dir: 'coverage/',
            reporters: [
                { type: "html", subdir: "html" },
                { type: 'text-summary' }
            ]
        }
    });
};
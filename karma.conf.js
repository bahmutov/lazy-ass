// single run:
// karma start karma.conf.js

// continuous watch and rerun on file changes using PhantomJS
// karma start karma.conf.js --single-run=false --browsers=PhantomJS

// single run using Chrome (not run by default)
// karma start karma.conf.js --browsers=Chrome

// continuous run using Chrome
// karma start karma.conf.js --single-run=false --browsers=Chrome

// if you want to debug source code in the browser and do not need coverage
// karma start karma.conf.js --single-run=false --browsers=Chrome --debug

var sourcePreprocessors = 'coverage';
function isDebug(argument) {
    return argument === '--debug';
}
if (process.argv.some(isDebug)) {
    sourcePreprocessors = [];
}

module.exports = function (config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/expect.js/index.js',
      'index.js',
      'test/*spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    preprocessors: {
      'index.js': sourcePreprocessors,
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots', 'coverage'],

    coverageReporter: {
      reporters: [{
        type: 'lcov',
        dir : 'coverage/'
      }, {
        type: 'text-summary'
      }],
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 10000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};

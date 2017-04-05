// Karma configuration
// Generated on Tue Apr 04 2017 18:31:11 GMT+0530 (IST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

// logLevel: config.LOG_DEBUG,
// client: {
//   captureConsole: true,
//   browserConsoleLogOptions: {
//       level: 'log',
//       format: '%b %T: %m',
//       terminal: true
//     }
//
// },
    browserConsoleLogOptions: {
      terminal: true,
      level: ""
    },



    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'node_modules/angular-messages/angular-messages.js',
      'client/src/js/lib/jk-rating-stars.js',
      'client/src/js/app/app.js',
      'client/src/js/app/resources.js',
      'client/src/js/app/routes.js',
      'client/src/js/app/controllers/login.js',
      'client/src/js/app/controllers/logOut.js',
      'client/src/js/app/controllers/header.js',
      'client/src/js/app/controllers/videoList.js',
      'client/src/js/app/controllers/videoDetail.js',
      'client/src/js/app/services/constants.js',
      'client/src/js/app/services/user.js',
      'client/src/js/app/services/video.js',
      'client/index.html',
      'client/src/views/*.html',
      'client/src/js/app/controllers/tests/*.spec.js',
      'client/src/js/app/services/tests/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.html': ['ng-html2js'],
      'client/src/js/app/**/*.js': ['coverage'],
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'client/',
      moduleName: 'templates'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
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


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

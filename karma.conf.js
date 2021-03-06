module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'test/**/tests.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/tests.js': ['webpack',],
      'src/**/*.js': ['webpack', 'coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov' },
        { type: 'json' },
        { type: 'text-summary' },
        { type: 'text' },
        { type: 'html', dir: 'coverage/' }
      ]
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
    concurrency: Infinity,

    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, exclude: [/node_modules/], loader: 'babel-loader?plugins[]=istanbul' },
        ]
      }
    },
    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-chai',
      'karma-mocha',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-coverage',
      'karma-mocha-reporter'
    ]
  })
};

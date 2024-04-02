// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: 'src',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      require('path').join(__dirname, 'karma.polyfill.js') // https://stackoverflow.com/a/72192207
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random :  false
      }
    },
    coverageReporter:{
      dir: require('path').join(__dirname, '../../target/reports/coverage'),
      reporters: [
        { type: 'html'},
        { type: 'lcovonly'},
        { type: 'text-summary'},
        { type: 'cobertura', file: 'cobertura.xml', subdir: '.'},
        { type: 'text'}
      ],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'junit'],
    junitReporter: {
      outputFile: require('path').join(__dirname, '../../target/target/reports/junit/TESTS-xunit.xml'),
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessWithOptions'],
    customLaunchers: {
      ChromeHeadlessWithOptions: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu'
        ]
      }
    },
    concurrency: 3,
    singleRun: false
  });
};

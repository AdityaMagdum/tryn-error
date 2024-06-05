// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
// const runHeadless = process.env.RUN_HEADLESS || "true";
module.exports = function (config) {
  const runHeadless = config.browsers.length === 0 ? true : false;
  const browsers = runHeadless === true ? ['ChromeHeadlessNoSandbox'] : ['Chrome'];
  const customLaunchers =
    runHeadless === true
      ? {
          ChromeHeadlessNoSandbox: {
            base: 'ChromeHeadless',
            flags: ['--no-sandbox', '--headless', '--disable-gpu']
          }
        }
      : {
          Chrome_with_debugging: {
            base: 'Chrome',
            flags: ['--remote-debugging-port=9222'],
            debug: true
          }
        };

  config.set({
    basePath: '../../src',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-sonarqube-unit-reporter'),
      require('karma-coverage'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-verbose-reporter')
    ],
    files: [require('path').join(__dirname, 'karma.polyfill.js')],
    client: {
      captureConsole: false,
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: false
      }
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '../../target/reports/coverage'),
      reporters: [
        { type: 'html', subdir: 'coverage' },
        { type: 'text-summary' },
        { type: 'lcovonly' },
        { type: 'cobertura', file: 'cobertura.xml', subdir: 'coverage' }
      ],
      fixWebpackSourcePaths: true,
      'report-config': {
        cobertura: {
          file: 'cobertura.xml'
        }
      }
    },
    reporters: ['progress', 'verbose', 'kjhtml', 'junit', 'sonarqubeUnit'],
    junitReporter: {
      outputFile: require('path').join(__dirname, '../../target/target/reports/junit/TESTS-xunit.xml')
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: '../target/reports/coverage/sonar-unittests.xml',
      overrideTestDescription: true,
      useBrowserName: false,
      testPaths: ['./src']
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers,
    customLaunchers,
    concurrency: 3,
    browserNoActivityTimeout: 3000000,
    singleRun: false
  });
};

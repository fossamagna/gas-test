'use strict';

/* global Logger */
class LoggerReporter {
  start() {
    Logger.log('start');
  }
  testStart(test) {
    Logger.log(`start: ${test.title}`);
  }
  pass(test) {
    Logger.log(`Pass: ${test.title}`);
  }
  fail(test, error) {
    Logger.log(`Failed: ${test.title}, ${error}`);
  }
  testEnd(test) {
    Logger.log(`end: ${test.title}`);
  }
  end() {
    Logger.log('end');
  }
}

module.exports = LoggerReporter;

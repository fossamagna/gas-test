'use strict';

const LogReporter = require('./reporter/log-reporter');
const Test = require('./test');

class Tests {
  constructor() {
    this.tests = [];
    this.reporter = new LogReporter();
  }

  runAll() {
    this.reporter.start();
    this.tests.forEach(test => test.run(this.reporter));
    this.reporter.end();
  }

  test(title, fn) {
    this.tests.push(new Test(title, fn));
  }
}

module.exports = Tests;

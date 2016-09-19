'use strict';

const reporters = require('./reporters');
const Test = require('./test');

class Tests {
  constructor(reporter) {
    this.tests = [];
    const Reporter = reporters[reporter] || reporters.logger;
    this.reporter = new Reporter();
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

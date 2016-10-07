'use strict';

const reporters = require('./reporters');
const Suite = require('./suite');

class Tests {
  constructor(reporter) {
    this.suites = [];
    const Reporter = reporters[reporter] || reporters.logger;
    this._reporter = new Reporter();
  }

  reporter(reporter) {
    if (arguments.length) {
      const Reporter = reporters[reporter] || reporters.logger;
      this._reporter = new Reporter();
    }
    return this._reporter;
  }

  runAll() {
    this._reporter.start();
    this.suites.forEach(suite => suite.run(this._reporter));
    this._reporter.end();
  }

  test(title, fn) {
    const suite = this.suites[this.suites.length - 1];
    suite.test(title, fn);
  }

  suite(title, fn) {
    this.suites.push(new Suite(title, fn));
  }
}

module.exports = Tests;

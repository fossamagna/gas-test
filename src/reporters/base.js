'use strict';

/* eslint no-unused-vars: 0 */
class BaseReporter {
  constructor() {
    this._init();
  }

  _init() {
    this.stats = { tests: 0, passes: 0, failures: 0 };
    this.results = [];
    this.result = null;
  }

  start() {
    this._init();
    this.stats.start = new Date().getTime();
  }

  testStart(test) {
    this.stats.tests++;
    const result = new Result();
    result.test = test;
    result.start = new Date().getTime();
    this.results.push(result);
  }

  pass(test) {
    this.stats.passes++;
  }

  fail(test, error) {
    this.stats.failures++;
    const result = this.results[this.results.length - 1];
    result.error = error;
    result.failure = true;
  }

  testEnd(test) {
    const result = this.results[this.results.length - 1];
    result.end = new Date().getTime();
    result.duration = new Date().getTime() - result.start;
  }

  end() {
    const stats = this.stats;
    stats.end = new Date().getTime();
    stats.duration = new Date().getTime() - stats.start;
  }
}

class Result {
  constructor() {
    this.test;
    this.error;
    this.failure;
  }
}

module.exports = BaseReporter;

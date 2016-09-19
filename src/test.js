'use strict';

class Test {
  constructor(title, testFunction) {
    this.title = title;
    this.testFunction = testFunction;
  }

  run(reporter) {
    try {
      reporter.testStart(this);
      this.testFunction.call(this);
      reporter.pass(this);
    } catch (error) {
      reporter.fail(this, error);
    } finally {
      reporter.testEnd(this);
    }
  }
}

module.exports = Test;

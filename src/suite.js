'use strict';

const Test = require('./test');

class Suite {
  constructor(title, fn) {
    this.title = title;
    this.fn = fn;
    this.tests = [];
  }

  test(title, testFunction) {
    this.tests.push(new Test(this, title, testFunction));
  }

  run(reporter) {
    this.fn.call(this);
    this.tests.forEach(test => {
      test.run(reporter);
    });
  }
}

module.exports = Suite;

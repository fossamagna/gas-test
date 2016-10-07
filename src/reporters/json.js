'use strict';

const BaseReporter = require('./base');

/* eslint no-unused-vars: 0 */
class JsonReporter extends BaseReporter {
  constructor() {
    super();
  }

  end() {
    super.end();
    const stats = this.stats;
    const json = {
      stats: stats,
      results: this.results.map(this.createResult)
    };
    this.result = json;
  }

  createResult(result) {
    const createError = error => {
      if (!error) {
        return undefined;
      }
      return {
        message: error.message,
        actual: error.actual,
        expected: error.expected,
        stack: error.stack
      };
    };
    const stats = result;
    return {
      name: result.test.title,
      title: result.test.suite.title,
      duration: stats.duration || 0,
      failure: result.failure,
      error: createError(result.error)
    };
  }
}

module.exports = JsonReporter;

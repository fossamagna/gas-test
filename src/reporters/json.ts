import BaseReporter, { Result, Stats, GASError } from './base';

type JsonReporterResult = {
  stats: Stats;
  results: JsonResult[];
}

type JsonResult = {
  name: string;
  title: string;
  duration: number;
  failure: boolean;
  error?: JsonResultError;
}

type JsonResultError = {
  message: string;
  actual: any;
  expected: any;
  stack: any;
}

/* eslint no-unused-vars: 0 */
export default class JsonReporter extends BaseReporter<JsonReporterResult> {
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

  createResult(result: Result): JsonResult {
    const createError = (error?: GASError) => {
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

import Test from '../test';

export type Stats = {
  tests: number;
  passes: number;
  failures: number;
  start?: number;
  end?: number;
  duration?: number;
}

export class Result {
  readonly test: Test;
  error?: GASError;
  failure = false;
  start?: number;
  end?: number;
  duration?: number;
  constructor(test: Test) {
    this.test = test;
  }
}

export interface GASError extends Error {
  actual: number;
  expected: any;
}

/* eslint no-unused-vars: 0 */
export default class BaseReporter<R> {
  protected stats: Stats = { tests: 0, passes: 0, failures: 0 };
  protected results: Result[] = [];
  result: R | null = null;

  constructor() {
    this._init();
  }

  private _init() {
    this.stats = { tests: 0, passes: 0, failures: 0 };
    this.results = [];
    this.result = null;
  }

  start() {
    this._init();
    this.stats.start = new Date().getTime();
  }

  testStart(test: Test) {
    this.stats.tests++;
    const result = new Result(test);
    result.start = new Date().getTime();
    this.results.push(result);
  }

  pass(test: Test) {
    this.stats.passes++;
  }

  fail(test: Test, error: GASError) {
    this.stats.failures++;
    const result = this.results[this.results.length - 1];
    result.error = error;
    result.failure = true;
  }

  testEnd(test: Test) {
    const result = this.results[this.results.length - 1];
    result.end = new Date().getTime();
    result.duration = new Date().getTime() - (result.start || 0);
  }

  end() {
    const stats = this.stats;
    stats.end = new Date().getTime();
    stats.duration = new Date().getTime() - (stats.start || 0);
  }
}


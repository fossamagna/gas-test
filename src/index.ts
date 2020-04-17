import { getReporter, ReporterType } from './reporters';
import Suite from './suite';
import BaseReporter from './reporters/base';

export default class Tests {
  private suites: Suite[];
  private _reporter!: BaseReporter<{}>;
  constructor(reporter: ReporterType) {
    this.suites = [];
    this._reporter = getReporter(reporter);
  }

  reporter(reporter: ReporterType) {
    if (arguments.length) {
      this._reporter = getReporter(reporter);
    }
    return this._reporter;
  }

  runAll() {
    this._reporter.start();
    this.suites.forEach(suite => suite.run(this._reporter));
    this._reporter.end();
  }

  test(title: string, fn: Function) {
    const suite = this.suites[this.suites.length - 1];
    suite.test(title, fn);
  }

  suite(title: string, fn: Function) {
    this.suites.push(new Suite(title, fn));
  }
}


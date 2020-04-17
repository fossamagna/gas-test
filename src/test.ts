import Suite from './suite';
import BaseReporter from './reporters/base';

export default class Test {
  readonly suite: Suite;
  readonly title: string;
  private testFunction: Function;
  constructor(suite: Suite, title: string, testFunction: Function) {
    this.suite = suite;
    this.title = title;
    this.testFunction = testFunction;
  }

  run(reporter: BaseReporter<any>) {
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


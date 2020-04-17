import Test from './test';
import BaseReporter from './reporters/base';

export default class Suite {
  private tests: Test[] = []
  constructor(readonly title: string, private fn: Function) {
  }

  test(title: string, testFunction: Function) {
    this.tests.push(new Test(this, title, testFunction));
  }

  run(reporter: BaseReporter<any>) {
    this.fn.call(this);
    this.tests.forEach(test => {
      test.run(reporter);
    });
  }
}


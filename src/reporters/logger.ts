import Test from '../test';
import { GASError } from './base';

export default class LoggerReporter {
  start() {
    Logger.log('start');
  }
  testStart(test: Test) {
    Logger.log(`start: ${test.title}`);
  }
  pass(test: Test) {
    Logger.log(`Pass: ${test.title}`);
  }
  fail(test: Test, error: GASError) {
    Logger.log(`Failed: ${test.title}, ${error}`);
  }
  testEnd(test: Test) {
    Logger.log(`end: ${test.title}`);
  }
  end() {
    Logger.log('end');
  }
}


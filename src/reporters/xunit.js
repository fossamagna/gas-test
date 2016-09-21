'use strict';

/* global Logger XmlService */
/* eslint no-unused-vars: 0 */
class JUnitXmlReporter {
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
    // build XML
    const root = XmlService.createElement('testsuite');
    root.setAttribute('tests', 'gas-test');
    root.setAttribute('tests', stats.tests);
    root.setAttribute('failures', stats.failures);
    root.setAttribute('failures', stats.failures);
    root.setAttribute('timestamp', (new Date()).toISOString());
    root.setAttribute('time', (stats.duration / 1000) || 0);
    this.results.forEach(result => {
      const child = this.createTestCaseElement(result);
      root.addContent(child);
    });
    const document = XmlService.createDocument(root);
    const junitXml = XmlService.getPrettyFormat().format(document);
    this.result = junitXml;
  }

  createTestCaseElement(result) {
    const stats = result;
    const child = XmlService.createElement('testcase').setAttribute('name', result.test.title);
    child.setAttribute('time', (stats.duration / 1000) || 0);
    if (result.failure) {
      const failure = XmlService.createElement('failure');
      if (result.error) {
        const error = result.error;
        failure.setAttribute('type', error.constructor.name);
        let m = '';
        if (error.message) {
          m += error.message;
        }
        Logger.log(error);
        if (error.stack) {
          m += error.stack;
        }
        if (m) {
          const text = XmlService.createText(m);
          failure.addContent(text);
        }
      }
      child.addContent(failure);
    }
    return child;
  }
}

class Result {
  constructor() {
    this.test;
    this.error;
    this.failure;
  }
}

module.exports = JUnitXmlReporter;

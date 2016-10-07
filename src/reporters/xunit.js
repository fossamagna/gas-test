'use strict';

const BaseReporter = require('./base');

/* global Logger XmlService */
/* eslint no-unused-vars: 0 */
class JUnitXmlReporter extends BaseReporter {
  constructor() {
    super();
  }

  end() {
    super.end();
    const stats = this.stats;
    // build XML
    const root = XmlService.createElement('testsuite');
    root.setAttribute('name', 'gas-test');
    root.setAttribute('tests', stats.tests);
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
    const child = XmlService.createElement('testcase')
    .setAttribute('name', result.test.title)
    .setAttribute('classname', result.test.suite.title)
    .setAttribute('time', (stats.duration / 1000) || 0);
    if (result.failure) {
      const failure = XmlService.createElement('failure');
      if (result.error) {
        const error = result.error;
        failure.setAttribute('type', error.constructor.name);
        const m = this.createErrorMessage(result.error);
        if (m) {
          const text = XmlService.createText(m);
          failure.addContent(text);
        }
      }
      child.addContent(failure);
    }
    return child;
  }

  createErrorMessage(error) {
    if (!error) {
      return undefined;
    }
    let m = '';
    if (error.message) {
      m += error.message;
    }
    if (error.stack) {
      m += error.stack;
    }
    return m ? m : undefined;
  }
}

module.exports = JUnitXmlReporter;

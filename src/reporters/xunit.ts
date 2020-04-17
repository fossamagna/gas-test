import BaseReporter, { Result } from './base';

export type JUnitXMLReportResult = string;

/* eslint no-unused-vars: 0 */
export default class JUnitXmlReporter extends BaseReporter<JUnitXMLReportResult> {
  constructor() {
    super();
  }

  end() {
    super.end();
    const stats = this.stats;
    // build XML
    const root = XmlService.createElement('testsuite');
    root.setAttribute('name', 'gas-test');
    root.setAttribute('tests', stats.tests.toString());
    root.setAttribute('failures', stats.failures.toString());
    root.setAttribute('timestamp', (new Date()).toISOString());
    root.setAttribute('time', (stats.duration && (stats.duration / 1000) || 0).toString());
    this.results.forEach(result => {
      const child = this.createTestCaseElement(result);
      root.addContent(child);
    });
    const document = XmlService.createDocument(root);
    const junitXml = XmlService.getPrettyFormat().format(document);
    this.result = junitXml;
  }

  createTestCaseElement(result: Result) {
    const stats = result;
    const child = XmlService.createElement('testcase')
      .setAttribute('name', result.test.title)
      .setAttribute('classname', result.test.suite.title)
      .setAttribute('time', (stats.duration && (stats.duration / 1000) || 0).toString());
    if (result.failure) {
      const failure = XmlService.createElement('failure');
      if (result.error) {
        const error = result.error;
        failure.setAttribute('type', error.name);
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

  createErrorMessage(error: Error) {
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


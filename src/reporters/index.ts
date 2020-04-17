import JUnitXmlReporter from './xunit';
import LoggerReporter from './logger';
import JsonReporter from './json';
import BaseReporter from './base';

const reporters = {
  xunit: JUnitXmlReporter,
  logger: LoggerReporter,
  json: JsonReporter
};

export type ReporterType = 'xunit' | 'logger' | 'json';

export function getReporter(type: ReporterType) {
  return new (reporters[type] || LoggerReporter) as BaseReporter<any>;
}
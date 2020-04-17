'use strict';

import assert from 'assert';
import Tests from '../dist';
const t = new Tests();
const test = t.test.bind(t);
const suite = t.suite.bind(t);

/**
 * Run all test cases.
 * This method is supposed to called via Execution API.
 *
 * @return XUnit format XML
 */
global.run = function() {
  t.runAll();
};

suite('sample texst', () => {
  test('abc test', () => {
    assert.equal('abc', 'abc');
  });
});

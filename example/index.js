'use strict';

const assert = require('assert');
const Tests  = require('../src');
const t = new Tests();
const test = t.test.bind(t);

/*global global*/

/**
 * Run all test cases.
 * This method is supposed to called via Execution API.
 *
 * @return XUnit format XML
 */
global.run = function() {
  t.runAll();
};

test('abc test', () => {
  assert.equal('abc', 'abc');
});

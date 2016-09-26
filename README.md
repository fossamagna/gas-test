# gas-test [![NPM version][npm-image]][npm-url]  [![Build Status][travis-image]][travis-url]

> Simple test framework for Google Apps Script

## Installation

First, install gas-test using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```sh
npm install gas-test --save-dev
```

## Usage

app.js:
```js
const assert = require('assert');
const Tests = require('gas-unit');
const t = new Tests();
const suite = t.suite.bind(t);
const test = t.test.bind(t);

global.run = function run() {
  t.runAll();
}

suite('abc test suite', () => {
  test('abc test', () => {
    // assertion false
    assert.equal('abc', 'abx');
  });
});
```

### XUnit XML report

```js
const assert = require('assert');
const Tests = require('gas-unit');
const t = new Tests('xunit'); // use xunit reporter.
const suite = t.suite.bind(t);
const test = t.test.bind(t);

global.run = function run() {
  t.runAll();
  return t.reporter.result;
}
```

## Example

Demo can be found in the [example](https://github.com/fossamagna/gas-test/tree/master/example) directory.

## License

MIT © [fossamagna](https://github.com/fossamagna)

[npm-image]: https://badge.fury.io/js/gas-test.svg
[npm-url]: https://npmjs.org/package/gas-test
[travis-image]: https://travis-ci.org/fossamagna/gas-test.svg?branch=master
[travis-url]: https://travis-ci.org/fossamagna/gas-test

# gas-test

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
const test = t.test.bind(t);

global.run = function run() {
  t.runAll();
}

test('abc test', () => {
  // assertion false
  assert.equal('abc', 'abx');
});
```

## Example

Demo can be found in the [example](https://github.com/fossamagna/gas-test/tree/master/example) directory.

## License

MIT © [fossamagna](https://github.com/fossamagna)

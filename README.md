[![Build Status](https://travis-ci.org/caviarjs/caviar-test.svg?branch=master)](https://travis-ci.org/caviarjs/caviar-test)
[![Coverage](https://codecov.io/gh/caviarjs/caviar-test/branch/master/graph/badge.svg)](https://codecov.io/gh/caviarjs/caviar-test)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/caviarjs/caviar-test?branch=master&svg=true)](https://ci.appveyor.com/project/caviarjs/caviar-test)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/@caviar/test.svg)](http://badge.fury.io/js/@caviar/test)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/@caviar/test.svg)](https://www.npmjs.org/package/@caviar/test)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/caviarjs/caviar-test.svg)](https://david-dm.org/caviarjs/caviar-test)
-->

# @caviar/test

Testing utility for caviar, caviar blocks, and caviar plugins

## Install

```sh
$ npm i @caviar/test -D
```

## Usage

```js
const {
  runBlock
} = require('@caviar/test')

const block = await runBlock(NextBlock, options)
```

### await runBlock(block: Class, options: RunBlockOptions): Block

- **block** `Class` the subclass of `caviar.Block`
- **options** `RunBlockOptions`

```ts
interface RunBlockOptions {
  // Which is the same as the apply function of caviar.Plugin
  apply?: Function(getHooks: Function)
  // Array of config layers
  configChain: Array<Object>
  // The current working directory
  cwd: string
  dev?: boolean = false
  phase?: string = 'default'
}
```

## License

[MIT](LICENSE)

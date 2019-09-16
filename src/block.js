const assert = require('assert')
const {resolve} = require('path')
const {
  isString,
  isObject,
  isArray,
  isFunction
} = require('core-util-is')
const {HooksManager} = require('caviar/src/base/hookable')
const ConfigLoader = require('caviar/src/config/loader')
const {init, create, run} = require('caviar/src/block/runner')

module.exports = async (BlockClass, options) => {
  assert(isObject(options), 'runblock: options must be an object')

  const {
    apply,
    configChain,
    cwd,
    dev,
    phase = 'default'
  } = options

  assert(isString(cwd), 'options.cwd must be a string')
  assert(isString(phase), 'options.phase must be a string')

  assert(isArray(configChain) && configChain.every(isObject),
    'options.configChain must be an array of objects')

  const hooksManager = new HooksManager()
  const configLoader = new ConfigLoader()

  configLoader.chain = configChain.map((config, i) => ({
    config,
    configFile: `/path/to/config-loader-${i}.js`
  }))

  if (isFunction(apply)) {
    apply(hooksManager.getHooks)
  }

  const block = init(
    BlockClass,
    {
      cwd: resolve(cwd),
      dev: !!dev,
      phase
    },
    hooksManager,
    configLoader
  )

  create(block)
  await run(block)

  return block
}

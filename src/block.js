const assert = require('assert')
const {
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
    caviarOptions
  } = options

  assert(isObject(caviarOptions),
    'options.caviarOptions must be an object')

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
    caviarOptions,
    hooksManager,
    configLoader
  )

  create(block)
  await run(block)

  return block
}

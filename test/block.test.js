const test = require('ava')
// const log = require('util').debuglog('@caviar/test')
const {
  runBlock
} = require('..')
const B = require('./block')

test('runBlock', async t => {
  const block = await runBlock(B, {
    apply () {},
    cwd: __dirname,
    configChain: [{}]
  })

  t.true(block.true())
})

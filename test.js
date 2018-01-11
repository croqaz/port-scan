import test from 'ava'
import { portCheck } from './'

test('test google.com', async t => {
  // Would be funny to fail :))
  let time = await portCheck('google.com')
  t.true(time > 0)
  time = await portCheck('google.com', { port: 443 })
  t.true(time > 0)
})

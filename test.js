import test from 'ava'
import { portCheck, portScan } from './'

test('test google.com default port', async t => {
  // Would be funny to fail :))
  const time = await portCheck('google.com')
  t.true(time > 0)
})

test('test google.com:443', async t => {
  // Would be funny to fail :))
  const time = await portCheck('google.com', { port: 443 })
  t.true(time > 0)
})

test('test google.com port scanning', async t => {
  const ports = await portScan('google.com', { startPort: 80, endPort: 84, timeout: 250 })
  t.deepEqual(ports, [80])
})

test('test port scanning end-port', async t => {
  const ports = await portScan({ host: 'google.com', endPort: 84, timeout: 250 })
  t.deepEqual(ports, [80])
})

test('test port scanning start-port', async t => {
  const ports = await portScan({ host: 'google.com', startPort: 440, timeout: 250 })
  t.deepEqual(ports, [443])
})

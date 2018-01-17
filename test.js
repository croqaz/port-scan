import test from 'ava'
import { portCheck, portScan } from './'

const host = 'google.com'

test('test google.com default port', async t => {
  // Would be funny to fail :))
  const time = await portCheck(host)
  t.true(time > 0)
})

test('test google.com:443', async t => {
  const time = await portCheck(host, { port: 443 })
  t.true(time > 0)
})

test('test start-end port scanning', async t => {
  const ports = await portScan(host, { startPort: 80, endPort: 84, timeout: 250 })
  t.deepEqual(ports, [80])
})

test('test port list scanning', async t => {
  // Would be funny to fail :))
  const ports = [80, 443]
  const result = await portScan({ host, ports, timeout: 250 })
  t.deepEqual(ports, result)
})

test('test mixed port scanning', async t => {
  const ports = [80, 443]
  const result = await portScan({ host, ports, startPort: 80, endPort: 84, timeout: 250 })
  t.deepEqual(ports, result)
})

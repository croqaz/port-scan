const net = require('net')

const DEFAULT_TIMEOUT = 2500

function validateHost (host) {
  if (!host) {
    return
  }
  if (host.trim().length > 0) {
    return true
  }
}

async function portCheck (host, options = {}) {
  /*
   * Check a specific port from an IP, or a HOST.
   * The `host` must be an IP, or a HOST (defaults to localhost).
   * The `port` must be a number (defaults to 80).
   * If the port is open, returns the connection time, in miliseconds.
   * If the host doesn't exist, or the port is closed, returns -1.
   */
  const config = { port: 80, timeout: DEFAULT_TIMEOUT }

  if (typeof host === 'object') {
    options = { ...config, ...host }
    host = options.host
  } else {
    options = { ...config, ...options }
  }

  if (!options.host && typeof host === 'string') {
    options.host = host
  }

  if (!validateHost(options.host)) {
    throw new Error('host cannot be empty')
  }

  return new Promise(function (resolve) {
    const startTime = new Date()

    const c = net.connect(options, () => {
      const ok = c.readable && c.writable
      if (!ok) {
        c.destroy()
        resolve(-1)
      }
      const diffTime = new Date() - startTime
      c.destroy()
      resolve(diffTime)
    })

    c.on('timeout', () => {
      // console.error('Conn timeout', options.timeout)
      c.destroy()
      resolve(-1)
    })

    c.on('error', () => {
      // console.error('Conn error', err.message)
      c.destroy()
      resolve(-1)
    })

    c.end()
  })
}

async function portScan (host, options = {}) {
  /*
   * Check a range of ports from an IP, or a HOST.
   * The `host` must be an IP, or a HOST (defaults to localhost).
   * The `startPort` and `endPort` must be a numbers between 1 and 65,535.
   * If the port is open, returns the connection time, in miliseconds.
   * If the host doesn't exist, or the port is closed, returns -1.
   */
  const config = { startPort: 80, endPort: 443, timeout: DEFAULT_TIMEOUT }

  if (typeof host === 'object') {
    options = { ...config, ...host }
    host = options.host
  } else {
    options = { ...config, ...options }
  }

  if (!options.host && typeof host === 'string') {
    options.host = host
  }
  if (!validateHost(options.host)) {
    throw new Error('host cannot be empty')
  }

  if (options.startPort < 1 || options.startPort > 65535) {
    throw new Error('startPort option out of range 1...65,535')
  }
  if (options.endPort < 1 || options.endPort > 65535) {
    throw new Error('endPort option out of range 1...65,535')
  }

  const openPorts = []

  for (let port = options.startPort; port <= options.endPort; port++) {
    const success = await portCheck({ host, port, timeout: options.timeout })
    if (success > 0) {
      openPorts.push(port)
    }
  }

  return openPorts
}

module.exports = {
  portCheck,
  portScan
}

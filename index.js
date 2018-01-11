const net = require('net')

const DEFAULT_TIMEOUT = 2500

function validateHost (host) {
  if (host.trim().length > 0) {
    return true
  }
}

async function portCheck (
  host,
  options = { port: 80, timeout: DEFAULT_TIMEOUT }
) {
  /*
   * Check a specific port from an IP, or a HOST.
   * The `host` must be an IP, or a HOST (defaults to localhost).
   * The `port` must be a number (defaults to 80).
   * If the port is open, returns the connection time, in miliseconds.
   * If the host doesn't exist, or the port is closed, returns -1.
   */

  if (!options.host) {
    options.host = host
  }
  if (!validateHost(options.host)) {
    throw new Error('host cannot be empty')
  }
  if (!options.timeout) {
    options.timeout = DEFAULT_TIMEOUT
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

module.exports = {
  portCheck
}

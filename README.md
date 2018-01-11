# ං Port-scan

	> Node.js simple port scan

  [![NPM Version][npm-image]][npm-url]
  [![Build Status][build-image]][build-url]
  [![Standard Style Guide][style-image]][style-url]


## Examples

```js
const { portCheck, portScan } = require('@croqaz/port-scan')

portCheck('google.com', { port: 443 })
	.then(t => console.log('Response time: %dms', t))

portScan('google.com', { startPort: 80, endPort: 85, timeout: 100 })
	.then(p => console.log('Open ports', p))
```


## Installation

Simply install with npm:

> $ npm install @croqaz/port-scan


## Similar libraries

* https://github.com/baalexander/node-portscanner


-----

## License

[MIT](LICENSE) © Cristi Constantin.


[npm-image]: https://img.shields.io/npm/v/@croqaz/port-scan.svg
[npm-url]: https://www.npmjs.com/package/@croqaz/port-scan
[build-image]: https://travis-ci.org/croqaz/port-scan.svg?branch=master
[build-url]: https://travis-ci.org/croqaz/port-scan
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com

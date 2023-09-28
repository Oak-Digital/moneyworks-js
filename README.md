# moneyworks

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
<!-- [![bundle][bundle-src]][bundle-href] -->
<!-- [![JSDocs][jsdocs-src]][jsdocs-href] -->
[![License][license-src]][license-href]

A javascript/typescript client and CLI to interact with the [moneyworks](https://www.cognito.co.nz) REST API.

## Getting started

Install the library

```
npm i @oak-digital/moneyworks
```

Instantiate the client

```typescript
import { MoneyWorksClient } from '@oak-digital/moneyworks'

const client = new MoneyWorksClient({
    host: 'hostname',
    port: '1234', // The port for the REST API
    username: 'serveruser',
    password: 'serverpass',
    dataFile: 'folder/data file.moneyworks', // do not url encode this, it is done internally so spaces are allowed
    dataFileUsername: '...',
    dataFilePassword: '...',
})
```

As an example you can fetch all products from moneyworks

```typescript
const productArray = await client.getProducts()
```

Check the typescript signature on the client for more information of the methods

## CLI

The CLI can be installed globally or part of a project

```
npm i -g @oak-digital/moneyworks
```

Then you can use the `mw` command

```
$ mw --help

Usage: mw [options] [command]

A CLI for MoneyWorks Datacentre REST API

Options:
  -v                                       output the version number
  -h, --host <host>                        The host of the MoneyWorks Datacentre server (env: MW_HOST)
  -p, --port <port>                        The port of the MoneyWorks Datacentre server (env: MW_PORT)
  -u, --username <username>                The username of the MoneyWorks Datacentre server (env: MW_USERNAME)
  -P, --password <password>                The password of the MoneyWorks Datacentre server (env: MW_PASSWORD)
  -d, --data-file <dataFile>               The data file of the MoneyWorks Datacentre server (env: MW_DATA_FILE)
  --data-file-username <dataFileUsername>  The data file username of the MoneyWorks Datacentre server (env: MW_DATA_FILE_USERNAME)
  --data-file-password <dataFilePassword>  The data file password of the MoneyWorks Datacentre server (env: MW_DATA_FILE_PASSWORD)
  --secure                                 Whether to use HTTPS (default: true, env: MW_SECURE)
  --help                                   display help for command

Commands:
  version
  export <table>
  import <table> <file>
  help [command]                           display help for command

```

## License

[MIT](./LICENSE) License © 2023-PRESENT [Anthony Fu](https://github.com/antfu)


<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@oak-digital/moneyworks?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@oak-digital/moneyworks
[npm-downloads-src]: https://img.shields.io/npm/dm/@oak-digital/moneyworks?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@oak-digital/moneyworks
[bundle-src]: https://img.shields.io/bundlephobia/minzip/moneyworks?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=moneyworks
[license-src]: https://img.shields.io/github/license/Oak-Digital/moneyworks-js.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/Oak-Digital/moneyworks-js/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@oak-digital/moneyworks

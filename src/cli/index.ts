import { Command, Option } from '@commander-js/extra-typings'

// import { Command, Option } from 'commander'

import packageJson from '../../package.json' assert { type: 'json' }
import { MoneyWorksClient } from '../client'

// import packageJson from '../../package.json'

const program = new Command()
  .name('mw')
  .version(packageJson.version, '-v')
  .description('A CLI for MoneyWorks Datacentre REST API')
  .addOption(
    new Option(
      '-h, --host <host>',
      'The host of the MoneyWorks Datacentre server',
    ).env('MW_HOST'),
  )
  .addOption(
    new Option(
      '-p, --port <port>',
      'The port of the MoneyWorks Datacentre server',
    ).env('MW_PORT'),
  )
  .addOption(
    new Option(
      '-u, --username <username>',
      'The username of the MoneyWorks Datacentre server',
    ).env('MW_USERNAME'),
  )
  .addOption(
    new Option(
      '-P, --password <password>',
      'The password of the MoneyWorks Datacentre server',
    ).env('MW_PASSWORD'),
  )
  .addOption(
    new Option(
      '-d, --data-file <dataFile>',
      'The data file of the MoneyWorks Datacentre server',
    ).env('MW_DATA_FILE'),
  )
  .addOption(
    new Option(
      '--data-file-username <dataFileUsername>',
      'The data file username of the MoneyWorks Datacentre server',
    ).env('MW_DATA_FILE_USERNAME'),
  )
  .addOption(
    new Option(
      '--data-file-password <dataFilePassword>',
      'The data file password of the MoneyWorks Datacentre server',
    ).env('MW_DATA_FILE_PASSWORD'),
  )
  .addOption(
    new Option('--secure', 'Whether to use HTTPS')
      .default(true)
      .env('MW_SECURE'),
  )

program.parse()

const options = program.opts()
const {
  host,
  port,
  username,
  password,
  dataFile,
  dataFileUsername,
  dataFilePassword,
  secure,
} = options

if (!host)
  throw new Error('Host is required')

if (!dataFile)
  throw new Error('Data file is required')

const portNumber = port ? Number.parseInt(port) : undefined
if (portNumber && Number.isNaN(portNumber))
  throw new Error('Port must be a number')

const client = new MoneyWorksClient({
  host,
  port: portNumber,
  username,
  password,
  dataFile,
  dataFileUsername,
  dataFilePassword,
  secure,
})

  ; (async () => {
  await client.request('GET', 'version')
})()

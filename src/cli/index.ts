import { Command, Option } from '@commander-js/extra-typings'

// import { Command, Option } from 'commander'

import packageJson from '../../package.json' assert { type: 'json' }
import { setupVersionCommand } from './commands/version'
import { setupExportCommand } from './commands/export'
import { setupImportCommand } from './commands/import'

// import packageJson from '../../package.json'

export const program = new Command()
  .name('mw')
  .version(packageJson.version, '-v')
  .description('A CLI for MoneyWorks Datacentre REST API')
  .addOption(
    new Option(
      '-h, --host <host>',
      'The host of the MoneyWorks Datacentre server',
    )
      .env('MW_HOST')
      .makeOptionMandatory(),
  )
  .addOption(
    new Option(
      '-p, --port <port>',
      'The port of the MoneyWorks Datacentre server',
    )
      .env('MW_PORT')
      .argParser(value => Number.parseInt(value)),
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
    )
      .env('MW_DATA_FILE')
      .makeOptionMandatory(),
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

setupVersionCommand(program)
setupExportCommand(program)
setupImportCommand(program)

program.parse()
//

// ; (async () => {
//   const version = await client.version()
//   console.log(version)
// })()

import { Argument } from '@commander-js/extra-typings'
import type { program } from '..'
import { createClient } from '../create-client'
import { moneyWorksTables } from '../../client'

export function setupExportCommand(p: typeof program) {
  p.command('export')
    .addArgument(
      new Argument('<table>', 'The table to export').choices(moneyWorksTables),
    )
    .action(async (table, options, command) => {
      const client = createClient(p)
      const data = await client.export(table)
      /* eslint-disable-next-line no-console */
      console.log(data)
    })
}

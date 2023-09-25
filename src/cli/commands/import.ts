import { readFile } from 'node:fs/promises'
import { Argument } from '@commander-js/extra-typings'
import type { program } from '..'
import { createClient } from '../create-client'
import { moneyWorksTables } from '../../client'

export function setupImportCommand(p: typeof program) {
  p.command('import')
    .addArgument(
      new Argument('<table>', 'The table to import into').choices(
        moneyWorksTables,
      ),
    )
    .addArgument(new Argument('<file>', 'The file to import'))
    .action(async (table, fileName, options, command) => {
      const client = createClient(p)
      let fileData
      try {
        fileData = await readFile(fileName)
      }
      catch (error) {
        console.error('Could not read file', error)
        return
      }

      const data = await client.import(table, fileData.toString())

      // const data = await client.export(table)
      /* eslint-disable-next-line no-console */
      console.log(data.data)
    })
}

import process from 'node:process'
import { Argument, Option } from '@commander-js/extra-typings'
import type { program } from '..'
import { createClient } from '../create-client'

export function setupGetInvoiceCommand(p: typeof program) {
  p.command('get-invoice')
    .addArgument(
      new Argument(
        '<sequence number>',
        'The sequence number that you want to get the invoice of',
      ),
    )
    .addOption(
      new Option(
        '-f, --form <form name>',
        'The form name to use for the invoice',
      ),
    )
    .action(async (sequenceNumber, options, command) => {
      const client = createClient(p)
      const data = await client.getInvoice(sequenceNumber, options.form)
      /* eslint-disable-next-line no-console */
      // console.log(data.request)
      process.stdout.write(data.data)
      // await writeFile('test-invoice.pdf', data.data)
    })
}

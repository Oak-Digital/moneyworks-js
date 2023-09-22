import type { program } from '..'
import { createClient } from '../create-client'

export function setupVersionCommand(p: typeof program) {
  p.command('version').action(async (options, command) => {
    const client = createClient(p)
    const version = await client.version()
    /* eslint-disable-next-line no-console */
    console.log(version)
  })
}

import { MoneyWorksClient } from '../client'
import type { program } from '.'

export function createClient(p: typeof program) {
  const {
    host,
    port,
    username,
    password,
    dataFile,
    dataFileUsername,
    dataFilePassword,
    secure,
  } = p.opts()

  return new MoneyWorksClient({
    host,
    port,
    username,
    password,
    dataFile,
    dataFileUsername,
    dataFilePassword,
    secure,
  })
}

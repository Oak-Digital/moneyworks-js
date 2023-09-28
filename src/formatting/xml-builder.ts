import { XMLBuilder } from 'fast-xml-parser'
import type { CreateTransaction } from '../types/transaction'
import { formatDate } from './date'

export function buildTransactionXml(transaction: CreateTransaction) {
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    suppressBooleanAttributes: false,
    format: true,
    processEntities: false,
  })

  const workItOutObject = {
    '@_work-it-out': 'true',
  }

  const {
    ourref,
    transdate,
    duedate,
    detail,
    type,
    flag,
    namecode,
    gross,
    ...rest
  } = transaction

  const xml = builder.build({
    '?xml': {
      '@_version': '1.0',
    },
    'table': {
      '@_name': 'Transaction',
      '@_count': 1,
      '@_start': 0,
      '@_found': 1,
      'transaction': {
        ourref: ourref ?? workItOutObject,
        transdate: transdate ? formatDate(transdate) : workItOutObject,
        duedate: duedate ? formatDate(duedate) : workItOutObject,
        type,
        namecode,
        flag,
        gross: gross ?? detail.reduce((acc, { gross = 0 }) => acc + gross, 0),
        ...rest,
        subfile: {
          '@_name': 'Detail',
          'detail': detail.map((detail) => {
            return Object.entries(detail).reduce(
              (acc, [key, value]) => {
                acc[`detail.${key}`] = value
                return acc
              },
              {} as Record<string, string>,
            )
          }),
        },
      },
    },
  })

  return xml
}

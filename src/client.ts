import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { base64Encode } from './lib/base64'
import type { CreateTransaction } from './types/transaction'

export interface MoneyWorksClientOptions {
  readonly host: string
  readonly port?: number
  readonly username?: string
  readonly password?: string
  readonly dataFile: string
  readonly dataFileUsername?: string
  readonly dataFilePassword?: string
  readonly secure?: boolean
}

export const moneyWorksCommands = [
  'version',
  'list',
  'export',
  'import',
  'evaluate',
  'post',
  'doreport',
  'doform',
  'image',
] as const

export type MoneyWorksCommand = (typeof moneyWorksCommands)[number]

// Available table names are: account, ledger, general, department, link, transaction, detail, log, taxrate, message, name, payments, product (items), job, build, jobsheet, bankrecs, autosplit, memo, user, user2, offledger, filter, stickies, lists, login, contacts, inventory, assetcat and asset
export const moneyWorksTables = [
  'account',
  'ledger',
  'general',
  'department',
  'link',
  'transaction',
  'detail',
  'log',
  'taxrate',
  'message',
  'name',
  'payments',
  'product',
  'job',
  'build',
  'jobsheet',
  'bankrecs',
  'autosplit',
  'memo',
  'user',
  'user2',
  'offledger',
  'filter',
  'stickies',
  'lists',
  'login',
  'contacts',
  'inventory',
  'assetcat',
  'asset',
] as const

export type MoneyWorksTable = (typeof moneyWorksTables)[number]

export class MoneyWorksClient {
  private host: string
  private port?: number
  private username?: string
  private password?: string
  private dataFile: string
  private dataFileUsername?: string
  private dataFilePassword?: string
  private secure: boolean

  constructor(options: MoneyWorksClientOptions) {
    this.host = options.host
    this.port = options.port
    this.username = options.username
    this.password = options.password
    this.dataFile = options.dataFile
    this.dataFileUsername = options.dataFileUsername
    this.dataFilePassword = options.dataFilePassword
    this.secure = options.secure ?? true
  }

  private getScheme() {
    return this.secure ? 'https' : 'http'
  }

  public async request<T>(
    method: string,
    command: MoneyWorksCommand,
    params: Record<string, string> = {},
    axiosConfig: AxiosRequestConfig = {},
  ) {
    // https://secure.cognito.co.nz/developer/moneyworks-datacentre-rest-api/

    const auths: string[] = []
    const encodedDataFile = encodeURIComponent(this.dataFile)
    if (this.username && this.password) {
      const serverAuth = base64Encode(`${this.username}:${this.password}`)
      auths.push(`Basic ${serverAuth}`)
    }
    let dataFileAuth = ''
    if (this.dataFileUsername && this.dataFilePassword) {
      // TODO: make it work with auth header
      // const splittedDataFileName = this.dataFile.split('/')
      // const dataFileName = splittedDataFileName[splittedDataFileName.length - 1]
      // const dataFileNameWithoutExtension = dataFileName.replace(/\.moneyworks$/, '')
      // const documentAuth = base64Encode(
      //   `${this.dataFileUsername}:${encodeURIComponent(dataFileName)}:${this.dataFilePassword}`,
      // )
      // auths.push(`Basic ${documentAuth}`)
      dataFileAuth = `${this.dataFileUsername}:${this.dataFilePassword}@`
    }
    const headers = {
      Authorization: auths.join(', '),
    } as const satisfies AxiosRequestConfig['headers']

    const portString = this.port ? `:${this.port}` : ''

    const response = await axios.request<T>({
      method,
      headers,
      url: `${this.getScheme()}://${this.host
        }${portString}/REST/${dataFileAuth}${encodedDataFile}/${command}`,
      params: {
        format: 'xml',
        ...params,
      },
      ...axiosConfig,
    })

    return response
  }

  public async version() {
    const response = await this.request<string>('GET', 'version')
    return response
  }

  public async export(tableName: MoneyWorksTable) {
    const response = await this.request<string>('GET', 'export', {
      table: tableName,
    })
    return response
  }

  public async import(tableName: MoneyWorksTable, data: string) {
    const response = await this.request<string>(
      'POST',
      'import',
      {
        table: tableName,
      },
      {
        data,
      },
    )
    return response
  }

  private formatDate(date: Date) {
    return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
  }

  public async createTransaction(data: CreateTransaction) {
    const builder = new XMLBuilder({
      ignoreAttributes: false,
      suppressBooleanAttributes: false,
      format: true,
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
    } = data

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
          transdate: transdate ? this.formatDate(transdate) : workItOutObject,
          duedate: duedate ? this.formatDate(duedate) : workItOutObject,
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

    // console.log(xml)

    const response = await this.import('transaction', xml)
    return response
  }

  public async getProducts() {
    const response = await this.export('product')

    const parser = new XMLParser({})
    const parsed = parser.parse(response.data)

    const products = parsed?.table?.product
    if (!Array.isArray(products))
      throw new Error('Invalid response')

    return products
  }
}

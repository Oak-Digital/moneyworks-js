import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { base64Encode } from './lib/base64'

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

  public async request(method: string, command: MoneyWorksCommand) {
    // https://secure.cognito.co.nz/developer/moneyworks-datacentre-rest-api/

    const auths: string[] = []
    if (this.username && this.password) {
      const serverAuth = base64Encode(`${this.username}:${this.password}`)
      auths.push(`Basic ${serverAuth}`)
    }
    if (this.dataFileUsername && this.dataFilePassword) {
      const documentAuth = base64Encode(`${this.dataFileUsername}:${this.dataFile}:${this.dataFilePassword}`)
      auths.push(`Basic ${documentAuth}`)
    }
    const headers = {
      Authorization: auths.join(', '),
    } as const satisfies AxiosRequestConfig['headers']

    const portString = this.port ? `:${this.port}` : ''

    const response = await axios.request({
      method,
      headers,
      url: `${this.getScheme()}://${this.host}${portString}/REST/${encodeURIComponent(this.dataFile)}/${command}`,
      params: {
        format: 'xml',
      },
    })

    // console.log(response.data)
  }
}

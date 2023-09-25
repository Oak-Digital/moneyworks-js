export interface Transaction {
  ourref: string | number
  transdate: Date
  duedate: Date
  theirref?: string
  type: string
  namecode?: string
  flag?: string
  gross: number
  description?: string
  contra?: number
  tofrom: string
  prodpricecode: string
  mailingaddress?: string
  deliveryaddress?: string
  detail: TransactionDetail[]
  [key: `user${number}`]: string
  // TODO: Allow passthrough
  // [key: string]: any
}

export interface TransactionDetail {
  account: string
  taxcode?: string
  gross: number
  net: number
  description?: string
  tax?: number
  saleunit?: string
  stockqty: number
  stockcode: string
  costprice?: number
  unitprice: number
  orderqty: number
  stocklocation?: string
  // TODO: Allow passthrough
  // [key: string]: any
}

type CreateOptionalKeys = 'ourref' | 'transdate' | 'duedate' | 'gross'

export type CreateTransaction = Omit<Transaction, CreateOptionalKeys> & Partial<Pick<Transaction, CreateOptionalKeys>>

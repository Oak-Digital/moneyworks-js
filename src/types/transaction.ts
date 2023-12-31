export interface Transaction {
  ourref: string | number
  transdate: Date
  duedate: Date
  /**
   * The order id that should be displayed to the customer
   */
  theirref?: string | number
  type: string
  namecode?: string
  flag?: string
  gross: number
  description?: string
  contra?: number | string
  tofrom: string
  prodpricecode: string
  mailingaddress?: string
  deliveryaddress?: string
  detail: TransactionDetail[]
  user1?: string
  /**
   * User phone number
   */
  user2?: string
  /**
   * User email address
   * @example test@example.com
   */
  user3?: string
  // TODO: Make thid work with Date
  user4?: string
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

export type CreateTransaction = Omit<Transaction, CreateOptionalKeys> &
  Partial<Pick<Transaction, CreateOptionalKeys>> & {
    /**
     * Whether or not the invoice sequence number should be returned
     */
    return_seq?: boolean
  }

import { describe, expect, it } from 'vitest'
import type { CreateTransaction } from '../src/types/transaction'
import { buildTransactionXml } from '../src/formatting/xml-builder'

describe('xml-builder', () => {
  it('Should format xml for a transaction', () => {
    const first_name = 'a'
    const last_name = 'b'
    const date = new Date('2023/09/28')
    const data = {
      type: 'SOI',
      flag: 'EDI',
      namecode: 'WEB_ORDER',
      tofrom: `${first_name} ${last_name}`,
      duedate: date,
      transdate: date,
      prodpricecode: 'A',
      mailingaddress: 'address1&#13;123',
      deliveryaddress: 'address2',
      detail: [],
    } satisfies CreateTransaction

    const xml = buildTransactionXml(data)

    const expectedXml = `\
<?xml version="1.0"?>
<table name="Transaction" count="1" start="0" found="1">
  <transaction>
    <ourref work-it-out="true"></ourref>
    <transdate>2023928</transdate>
    <duedate>2023928</duedate>
    <type>SOI</type>
    <namecode>WEB_ORDER</namecode>
    <flag>EDI</flag>
    <gross>0</gross>
    <tofrom>a b</tofrom>
    <prodpricecode>A</prodpricecode>
    <mailingaddress>address1&#13;123</mailingaddress>
    <deliveryaddress>address2</deliveryaddress>
    <subfile name="Detail"></subfile>
  </transaction>
</table>
`

    expect(xml).toBe(expectedXml)
  })
})

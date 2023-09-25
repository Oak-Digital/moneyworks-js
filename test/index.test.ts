import { describe, expect, it } from 'vitest'
import { MoneyWorksClient } from '../src'

describe('should', () => {
  it('exported', () => {
    const client = new MoneyWorksClient({
      host: 'localhost',
      dataFile: 'test.moneyworks',
    })
    expect(client).not.toBeUndefined()
  })
})

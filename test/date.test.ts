import { describe, expect, it } from 'vitest'
import { formatDate } from '../src/formatting/date'

describe('format date', () => {
  it('should work with a date', () => {
    const date = new Date('2020-11-11')
    const formatted = formatDate(date)
    expect(formatted).toBe('20201111')
  })

  it('should work with dates with only one digit', () => {
    const date = new Date('2020-01-01')
    const formatted = formatDate(date)
    expect(formatted).toBe('20200101')
  })
})

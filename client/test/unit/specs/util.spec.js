import { abs } from '@/util'

describe('utility methods', () => {
  it('abs() method correctly gives the absolute value', () => {
    expect(abs(50)).toBe(50)
    expect(abs(-50)).toBe(50)
    expect(abs(0)).toBe(0)
  })
})

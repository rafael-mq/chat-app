/* eslint-disable no-undef */
const expect = require('expect')

const { isRealString } = require('./validation')

describe('isRealString Tests', () => {
  it('should return confirm that the passed argument is a string', () => {
    expect(isRealString({ x: 1 })).toBe(false)
    expect(isRealString('   ')).toBe(false)
    expect(isRealString('   abc   ')).toBe(true)
  })
})

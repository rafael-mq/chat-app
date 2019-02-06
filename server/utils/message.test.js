/* eslint-disable no-undef */
const expect = require('expect')

const { generateMessage } = require('./message')

describe('Message Generator Tests', () => {
  it('should generate correct message', () => {
    let from = 'rafael'
    let text = 'dummy text'
    let message = generateMessage(from, text)
    expect(message.from).toBe(from)
    expect(message.text).toBe(text)
    expect(typeof message.createdAt).toBe('number')
  })
})

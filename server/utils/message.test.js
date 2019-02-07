/* eslint-disable no-undef */
const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage Tests', () => {
  it('should generate correct message', () => {
    let from = 'rafael'
    let text = 'dummy text'
    let message = generateMessage(from, text)
    expect(message.from).toBe(from)
    expect(message.text).toBe(text)
    expect(typeof message.createdAt).toBe('number')
  })
})

describe('generateLocationMessage Tests', () => {
  it('should generate correct location message', () => {
    let from = 'Admin'
    let latitude = 42.6
    let longitude = -10.5
    let message = generateLocationMessage(from, latitude, longitude)
    expect(message.from).toBe(from)
    expect(typeof message.url).toBe('string')
    expect(typeof message.createdAt).toBe('number')
  })
})

/* eslint-disable no-undef */
const { Users } = require('./users')

const expect = require('expect')

describe('Users class tests', () => {
  let dummyUsers

  beforeEach('populate users', () => {
    dummyUsers = new Users()
    dummyUsers.users = [{
      id: '1',
      name: 'user1',
      room: 'node course'
    }, {
      id: '2',
      name: 'user2',
      room: 'react course'
    }, {
      id: '3',
      name: 'user3',
      room: 'node course'
    }]
  })

  it('should add new user', () => {
    let rafael = dummyUsers.addUsers('sidjvnsdvj', 'rafael', 'node fans')

    expect(rafael).toMatchObject({
      id: 'sidjvnsdvj',
      name: 'rafael',
      room: 'node fans'
    })
    // expect(typeof dummyUsers.users).toBe('array')
    expect(dummyUsers.users.length).toBe(4)
    expect(dummyUsers.users[3]).toBe(rafael)
  })

  it('should correctfully remove an user', () => {
    let removed = dummyUsers.removeUser('1')

    expect(removed).toEqual({
      id: '1',
      name: 'user1',
      room: 'node course'
    })
    expect(dummyUsers.users.length).toBe(2)
  })

  it('should not remove unexisting user', () => {
    let removed = dummyUsers.removeUser('4')

    expect(removed).toBeUndefined()
    expect(dummyUsers.users.length).toBe(3)
  })

  it('should fetch user by its id', () => {
    let fetched = dummyUsers.getUser('1')

    expect(fetched).toEqual({
      id: '1',
      name: 'user1',
      room: 'node course'
    })
    expect(fetched).toEqual(dummyUsers.users[0])
  })

  it('should not fetch unexisting user', () => {
    let fetched = dummyUsers.getUser('4')

    expect(fetched).toBeUndefined()
  })

  it('should get users list by room', () => {
    let list = dummyUsers.getUsersList('node course')
    expect(list.length).toBe(2)
    expect(list).toEqual(['user1', 'user3'])
  })
})

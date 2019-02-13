class Users {
  constructor () {
    this.users = []
  }
  addUsers (id, name, room) {
    let user = { id, name, room }
    this.users.push(user)
    return user
  }
  removeUser (id) {
    var retUser
    this.users = this.users.filter(val => {
      if (val.id === id) {
        retUser = val
        return false
      }
      return true
    })

    return retUser
  }

  getUser (id) {
    return this.users.find(user => user.id === id)
  }

  getUsersList (room) {
    return this.users
      .filter(val => val.room === room)
      .map(val => val.name)
  }
}

module.exports = { Users }

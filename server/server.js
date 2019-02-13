/* eslint-disable standard/no-callback-literal */
const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')
const { Users } = require('./utils/users')

const publicPath = path.join(__dirname, './../public')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const users = new Users()

app.use(express.static(publicPath))

io.on('connection', socket => {
  console.log('new user connected')

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and Room Name are required.')
    }

    socket.join(params.room)
    users.removeUser(socket.id) // remove user if it already is logged in
    users.addUsers(socket.id, params.name, params.room)
    io.to(params.room).emit('updateUsersList', users.getUsersList(params.room))

    socket.emit('newMessage', generateMessage('Admin', `Welcome to the chat app, you're on ${params.room} room`))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))

    callback()
  })

  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id)

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
    }
    callback()
  })

  socket.on('createLocationMessage', coords => {
    let user = users.getUser(socket.id)
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    let user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('updateUsersList', users.getUsersList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
    }
  })
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}...`)
})

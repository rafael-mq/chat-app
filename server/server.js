const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')
const publicPath = path.join(__dirname, './../public')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', socket => {
  console.log('new user connected')

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'))

  socket.on('createMessage', message => {
    console.log('create Message', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
  })

  socket.on('createLocationMessage', coords => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}...`)
})

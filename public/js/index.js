/* eslint-disable no-undef */
const socket = io()

socket.on('connect', function () {
  console.log('connected to server')

  socket.emit('createMessage', {
    from: 'rafael@example.com',
    text: 'hey'
  })
})

socket.on('disconnect', function () {
  console.log('disconnected from server')
})

socket.on('newMessage', function (message) {
  console.log('New Message', message)
})

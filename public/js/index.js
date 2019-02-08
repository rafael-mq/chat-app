/* eslint-disable no-undef */
const socket = io()

socket.on('connect', function () {
  console.log('connected to server')
})

socket.on('disconnect', function () {
  console.log('disconnected from server')
})

socket.on('newMessage', function (message) {
  console.log('New Message', message)
  var formattedTime = moment(message.createdAt).format('h:mm A')
  var li = jQuery('<li></li>')
  li.text(`${formattedTime} - ${message.from}: ${message.text}`)
  jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm A')
  var li = jQuery('<li></li>')
  var a = jQuery('<a target ="_blank">Current Location</a>')
  li.text(`${formattedTime} - ${message.from}: `)
  a.attr('href', message.url)
  li.append(a)
  jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()

  var messageTextBox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  })
})

var locationButton = jQuery('#send-location')

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  } else {
    locationButton.attr('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log(position)
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
      locationButton.removeAttr('disabled')
    }, function () {
      alert('Unable to fetch location.')
    })
  }
})

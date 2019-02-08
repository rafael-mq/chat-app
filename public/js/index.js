/* eslint-disable no-undef */
const socket = io()

socket.on('connect', function () {
  console.log('connected to server')
})

socket.on('disconnect', function () {
  console.log('disconnected from server')
})

socket.on('newMessage', function (message) {
  var template = jQuery('#message-template').html()
  var html = Mustache.render(template, {
    createdAt: moment(message.createdAt).format('h:mm A'),
    from: message.from,
    text: message.text
  })

  jQuery('#messages').append(html)
})

socket.on('newLocationMessage', function (message) {
  var template = jQuery('#location-message-template').html()
  var html = Mustache.render(template, {
    createdAt: moment(message.createdAt).format('h:mm A'),
    from: message.from,
    url: message.url
  })

  jQuery('#messages').append(html)
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

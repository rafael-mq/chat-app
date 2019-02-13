/* eslint-disable no-undef */
const socket = io()

function scrollToBottom () {
  // selectors
  var messages = jQuery('#messages')
  var newMessage = messages.children('li:last-child')
  // heights
  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight = messages.prop('scrollHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function () {
  console.log('connected to server')
  var params = jQuery.deparam(window.location.search)

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err)
      // console.log(err)
      window.location.href = '/'
    } else {
      console.log('no errors')
    }
  })
})

socket.on('disconnect', function () {
  console.log('disconnected from server')
})

socket.on('updateUsersList', function (userslist) {
  console.log(userslist)
  var ul = jQuery('<ul></ul>')

  userslist.forEach(function (user) {
    ul.append(jQuery('<li></li>').text(user))
  })

  jQuery('#users').html(ul)
})

socket.on('newMessage', function (message) {
  var template = jQuery('#message-template').html()
  var html = Mustache.render(template, {
    createdAt: moment(message.createdAt).format('h:mm A'),
    from: message.from,
    text: message.text
  })

  jQuery('#messages').append(html)
  scrollToBottom()
})

socket.on('newLocationMessage', function (message) {
  var template = jQuery('#location-message-template').html()
  var html = Mustache.render(template, {
    createdAt: moment(message.createdAt).format('h:mm A'),
    from: message.from,
    url: message.url
  })

  jQuery('#messages').append(html)
  scrollToBottom()
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()

  var messageTextBox = jQuery('[name=message]')

  socket.emit('createMessage', {
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

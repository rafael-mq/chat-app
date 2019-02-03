const path = require('path')
const express = require('express')

const publicPath = path.join(path.dirname, './../public')
const app = express()

app.use(express.static(publicPath))

app.listen(3000, () => {
  console.log('Server is listening on port 3000...')
})

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { searchLocation, getWeather } = require('./weatherApi')

const app = express()
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(cors())
app.options('*', cors())

app.get('/search', function (req, res) {
  searchLocation(req, res)
})

app.get('/location', function (req, res) {
  getWeather(req, res)
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
)
const express = require('express')
const rethinkDB = require('rethinkdb')

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

rethinkDB.connect({ host: 'db', port: 28015 }, (err, conn) => {
  if(err) throw err
  console.log('connection to rethinkDB success')
})

const path = require('path')
const express = require('express')
const passport = require('passport')
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const db = require('./db.js')
db.init()

const app = express()
app.use('/static', express.static(path.join(__dirname, 'dist', 'static')))

app.use(cookieParser())
app.use(bodyParser())
app.use(session({ secret: 'lunar-chess-app' }))
app.use(passport.initialize())
app.use(passport.session())

require('./routes.js')(app, passport)

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

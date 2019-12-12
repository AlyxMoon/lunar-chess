const path = require('path')
const express = require('express')
const cors = require('cors')
const passport = require('passport')

require('dotenv').config({
  path: path.resolve(__dirname, '.env')
})

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const db = require('./db')
db.init()

const app = express()
app.use('/static', express.static(path.join(__dirname, 'dist', 'static')))

app.use(cors({
  credentials: true,
  exposedHeaders: ['set-cookie'],
  origin: [`http://localhost:${PORT}`]
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'lunar-chess-app',
  resave: false,
  saveUninitialized: false,
  cookie: { sameSite: false }
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routes')(app, passport)

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

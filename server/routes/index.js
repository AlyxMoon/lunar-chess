const path = require('path')

const routesAuth = require('./auth')
const routesGameRequest = require('./gameRequest')
const routesUser = require('./user')

module.exports = (app, passport) => {
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'index.html')))

  app.use('/auth', routesAuth)
  app.use('/gameRequest', routesGameRequest)
  app.use('/user', routesUser)
}

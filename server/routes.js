const path = require('path')
const { auth } = require('./auth')

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })

  app.post('/login', auth.authenticate('local'), (req, res) => {
    const safeUser = Object.assign({}, req.user)
    delete safeUser.password

    res.setHeader('Content-Type', 'application/json')
    res.json(safeUser)
  })

  app.get('/register', (req, res) => {
    console.log('register route reached')
  })

  app.get('/profile', isLoggedIn, (req, res) => {
    console.log('profile route reached', res.user)
  })

  app.get('/logout', (req, res) => {
    req.logout()

    res.setHeader('Content-Type', 'application/json')
    res.json({ success: true })
  })
}

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

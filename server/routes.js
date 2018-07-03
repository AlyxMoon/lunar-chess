const path = require('path')

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })

  app.get('/login', (req, res) => {
    console.log('login route reached')
  })

  app.get('/register', (req, res) => {
    console.log('register route reached')
  })

  app.get('/profile', isLoggedIn, (req, res) => {
    console.log('profile route reached', res.user)
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

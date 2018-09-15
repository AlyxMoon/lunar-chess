const passport = require('../../auth')
// const { allowLocalCredentials } = require('../../middleware')

const router = require('express').Router()

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  const { password, ...safeUser } = req.user
  req.login(safeUser, error => {
    if (error) {
      console.error(error.message, error.stack)
      return res.json({ success: false, error: error.message })
    }
    res.json({ success: true, data: req.user })
  })
})

router.get('/register', (req, res) => {
  console.log('register route reached')
})

router.get('/profile', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  console.log(req.isAuthenticated(), req.user)
  res.json(req.user)
})

router.get('/logout', (req, res) => {
  req.logout()

  res.setHeader('Content-Type', 'application/json')
  res.json({ success: true })
})

module.exports = router

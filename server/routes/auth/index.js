const passport = require('../../auth')
const { isLoggedIn } = require('../../middleware')

const router = require('express').Router()

router.post('/login', passport.authenticate('local'), (req, res) => {
  const safeUser = Object.assign({}, req.user)
  delete safeUser.password

  res.setHeader('Content-Type', 'application/json')
  res.json(safeUser)
})

router.get('/register', (req, res) => {
  console.log('register route reached')
})

router.get('/profile', isLoggedIn, (req, res) => {
  console.log('profile route reached', res.user)
})

router.get('/logout', (req, res) => {
  req.logout()

  res.setHeader('Content-Type', 'application/json')
  res.json({ success: true })
})

module.exports = router

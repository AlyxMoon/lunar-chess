const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { get, findOrCreate } = require('../db')

passport.use(new LocalStrategy(
  function (username, password, done) {
    findOrCreate({
      model: 'User',
      key: 'username',
      data: { username, password }
    })
      .then(user => done(null, user))
      .catch(done)
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  get({ model: 'User', id })
    .then(user => done(null, user))
    .catch(done)
})

module.exports = passport

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// const { findOrCreateUser } = require('./db.js')
const { User } = require('../db/models')

module.exports = {
  auth: passport.use(new LocalStrategy(
    function (username, password, done) {
      User.filter({ username: username })
        .then(user => {
          if (!user || user.length === 0) return done(null, false)
          return done(null, user[0])
        })
        .catch(done)
    }
  ))
}

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.get(id)
    .then(user => done(null, user))
    .catch(done)
})

const jwt = require('jsonwebtoken')
const PassportLocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const userToLogin = {
    username: username.trim(),
    password: password.trim()
  }

  User
    .findOne({username: userToLogin.username})
    .then(user => {
      if (!user || !user.authenticate(userToLogin.password)) {
        const error = new Error('Incorrect username or password')
        error.name = 'IncorrectCredentialsError'
        return done(error)
      }

      const payload = {
        sub: user.id
      }
      const token = jwt.sign(payload, 's0m3 r4nd0m str1ng',{expiresIn: '1h'})
      const data = {
        username: user.username,
        userId:user._id,
        isAdmin: user.roles.indexOf('Admin') != -1
      }

      if (user.roles) {
        data.roles = user.roles
      }

      return done(null, token, data)
    })
})

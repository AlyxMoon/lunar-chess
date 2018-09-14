const configDB = require('../../config/database.js')
const thinkagain = require('thinkagain')(configDB)

const User = thinkagain.createModel('User', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['username', 'email', 'password']
})

module.exports = User

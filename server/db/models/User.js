const { format } = require('date-fns')
const thinkagain = require('./shared/thinkagain')

const User = thinkagain.createModel('User', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    createdAt: {
      type: 'string',
      default: format(new Date())
    },
    updatedAt: {
      type: 'string',
      default: format(new Date())
    }
  },
  required: ['username', 'email', 'password']
})

module.exports = User

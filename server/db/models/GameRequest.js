const { format } = require('date-fns')
const thinkagain = require('./shared/thinkagain')

const GameRequest = thinkagain.createModel('GameRequest', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    type: { type: 'string' },
    userID: { type: 'string' },
    createdAt: {
      type: 'string',
      default: format(new Date())
    },
    updatedAt: {
      type: 'string',
      default: format(new Date())
    }
  },
  required: ['type', 'userID']
})

module.exports = GameRequest

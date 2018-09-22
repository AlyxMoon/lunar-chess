const { format } = require('date-fns')
const thinkagain = require('./shared/thinkagain')

const Game = thinkagain.createModel('Game', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    type: { type: 'string' },
    players: {
      type: 'array',
      items: { object: true },
      minItems: 2
    },
    currentPlayer: { type: 'string' },
    playerInCheck: { type: 'string' },
    pieces: {
      type: 'array',
      items: { object: true }
    },
    history: {
      type: 'array',
      items: { object: true }
    },
    board: { type: 'array' },
    createdAt: {
      type: 'string',
      default: format(new Date())
    },
    updatedAt: {
      type: 'string',
      default: format(new Date())
    }
  },
  required: [
    'type',
    'players',
    'currentPlayer',
    'playerInCheck',
    'pieces',
    'history',
    'board'
  ]
})

module.exports = Game

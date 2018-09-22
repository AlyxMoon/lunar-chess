const Game = require('./Game')
const GameRequest = require('./GameRequest')
const User = require('./User')

User.hasAndBelongsToMany(User, 'friends', 'id', 'id', { type: 'friend' })

module.exports = { Game, GameRequest, User }

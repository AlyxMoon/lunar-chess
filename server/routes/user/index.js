const router = require('express').Router()
const db = require('../../db')

const model = { model: 'User' }

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  db.find({ ...model, joins: { friends: true } })
    .then(result => res.json({ success: true, data: result }))
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

router.get('/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let id = req.params.id

  db.get({ ...model, id, joins: { friends: true } })
    .then(result => res.json({ success: true, data: result }))
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

router.get('/:id/friend/add/:friendId', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let { id, friendId } = req.params
  let user

  db.get({ ...model, id, joins: { friends: true } })
    .then(result => {
      if (result.friends.some(friend => friend.id === id)) {
        throw new Error('You already have that friend added')
      }

      user = result
      return db.get({ ...model, id: friendId })
    })
    .then(result => {
      if (!result) {
        throw new Error('The friend you are trying to add does not exist')
      }

      user.friends.push(result)
      return user.saveAll()
    })
    .then(result => {
      res.json({ success: true, data: result })
    })
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

router.get('/:id/friend/remove/:friendId', (req, res) => {
  // TODO Fill in
})

module.exports = router

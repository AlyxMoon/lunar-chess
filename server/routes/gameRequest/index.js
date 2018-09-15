const router = require('express').Router()
const db = require('../../db')
const { validGameTypes } = require('../../config/game')

const model = { model: 'GameRequest' }

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let { type } = req.query

  let dbQuery = { ...model }
  if (type && type in validGameTypes) dbQuery.type = type
  db.find(dbQuery)
    .then(result => res.json({ success: true, data: result }))
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

router.get('/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let id = req.params.id

  db.get({ ...model, id })
    .then(result => res.json({ success: true, data: result }))
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

router.post('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  let { data } = req.body
  if (!data) {
    return res.json({ success: false, error: 'the data field was not provided' })
  }
  if (!req.isAuthenticated()) {
    return res.json({ success: false, error: 'cannot create a game request if not logged in' })
  }

  data.userID = req.user.id
  db.create({ ...model, data })
    .then(result => {
      res.json({ success: true, data: result })
    })
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

// router.delete('/:id', (req, res) => {
//   res.setHeader('Content-Type', 'application/json')
//   let id = req.params.id
//
//   db.remove({ ...model, id })
//     .then(result => {
//       res.json({ success: true, data: result })
//     })
//     .catch(error => {
//       console.error(error.message, error.stack)
//       res.json({ success: false, error: error.message })
//     })
// })

module.exports = router

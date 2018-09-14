const rethinkDB = require('rethinkdb')
const configDB = require('../config/database.js')

const models = require('./models') // eslint-disable-line

module.exports = {
  init: () => {
    rethinkDB.connect(configDB, (err, conn) => {
      if (err) throw err
      console.log('connection to rethinkDB success')
    })
  }
}

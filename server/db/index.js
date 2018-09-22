const { format } = require('date-fns')

const rethinkDB = require('rethinkdb')
const configDB = require('../config/database.js')

const models = require('./models') // eslint-disable-line

const knownModels = require('./models')
const protectedKeys = ['id', 'createdAt', 'updatedAt']

module.exports = {
  init: () => {
    rethinkDB.connect(configDB, (err, conn) => {
      if (err) throw err
      console.log('connection to rethinkDB success')
    })
  },

  get: ({ model = '', id = 0, joins = {} }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      return resolve(knownModels[model].get(id).getJoin(joins).run())
    })
  },

  find: ({ model = '', filters = {}, joins = {} }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      return resolve(knownModels[model].filter(Object.assign({}, filters)).getJoin(joins).run())
    })
  },

  findCount: ({ model = '', filters = {} }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }
      return resolve(knownModels[model].filter(Object.assign({}, filters)).count().execute())
    })
  },

  findOne: ({ model = '', filters = {}, joins = {} }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      knownModels[model].filter(Object.assign({}, filters)).limit(1).getJoin(joins).run()
        .then(response => {
          if (!response || response.length < 1) {
            return resolve()
          }
          resolve(response[0])
        })
    })
  },

  create: ({ model = '', data = {} }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      let dataToSave = removeProtectedKeys(data)

      const newModel = new knownModels[model](dataToSave)
      return resolve(newModel.saveAll())
    })
  },

  findOrCreate: ({ model = '', key = 'id', data = {} }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      module.exports.findOne({ model, filters: { [key]: data[key] } })
        .then(response => {
          if (response) {
            return resolve(response)
          }
          return resolve(module.exports.create({ model, data: removeProtectedKeys(data) }))
        })
    })
  },

  update: ({ model = '', id, data = {} }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      let dataToSave = {
        ...removeProtectedKeys(data),
        updatedAt: format(new Date())
      }

      knownModels[model].get(id).getJoin().run().then(row => {
        resolve(row.merge(dataToSave).saveAll())
      })
    })
  },

  updateAll: ({ model = '', data = {} }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      let dataToSave = {
        ...removeProtectedKeys(data),
        updatedAt: format(new Date())
      }
      knownModels[model].getJoin().run().then(documents => {
        Promise.all(documents.map(document => document.merge(dataToSave).saveAll()))
          .then(resolve)
          .catch(reject)
      })
    })
  },

  remove: ({ model = '', id, joins = {} }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      knownModels[model].get(id).getJoin(joins).run().then(row => {
        resolve(row.deleteAll())
      })
    })
  }
}

const isKnownModel = (model) => {
  return Object.keys(knownModels).some(knownModel => knownModel === model)
}

const removeProtectedKeys = data => {
  const newData = Object.assign({}, data)
  protectedKeys.forEach(key => {
    delete newData[key]
  })

  return newData
}

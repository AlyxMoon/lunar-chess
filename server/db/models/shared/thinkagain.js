const path = require('path')

const dbConfig = require(path.join(__dirname, '..', '..', '..', 'config', 'database'))
const thinkagain = require('thinkagain')(dbConfig)

module.exports = thinkagain

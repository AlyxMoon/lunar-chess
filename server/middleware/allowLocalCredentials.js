const allowLocalCredentials = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Credentials', true)

  return next()
}

module.exports = allowLocalCredentials

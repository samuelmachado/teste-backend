const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const authConfig = require('../../config/auth')

module.exports = async (request, response, next) => {
  const authHeader = request.header.authorization
  if (!authHeader) {
    response.status(401)
    response.body = { error: 'Token not provided' }
    return
  }

  const [, token] = authHeader.split(' ')
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    response.status(401)
    request.userId = decoded.id

    return next()
  } catch (error) {
    response.status(401)
    response.body = { error: 'Token invalid' }
  }
}

const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const User = require('../models/User')

class AuthController {
  async store (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(401).body({ error: 'User not found' })
      return
    }
    if (!(await user.checkPassword(password))) {
      res.status(401).body = { error: 'Password does not match' }
      return
    }

    const { id } = user

    res.status(201).json({
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

module.exports = new AuthController()

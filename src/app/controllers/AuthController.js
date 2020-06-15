const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const Usuario = require('../models/Usuario')

class AuthController {
  async store (req, res) {
    const { email, senha } = req.body
    const usuario = await Usuario.findOne({ where: { email } })
    if (!usuario) {
      res.status(401).json({ error: 'Usuario não encontrado' })
      return
    }
    if (!(await usuario.checkPassword(senha))) {
      res.status(401).json({ error: 'Senha incorreta' })
      return
    }

    const { id } = usuario

    res.status(201).json({
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

module.exports = new AuthController()

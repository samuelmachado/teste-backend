const Usuario = require('../models/Usuario')
const Yup = require('yup')

class UserController {
  async index (req, res) {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nome', 'email']
    })
    res.status(200).json(usuarios)
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required().strict(),
      email: Yup.string().email().required(),
      senha: Yup.string().required()
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Falha de validação' })
    }

    const { nome, email, senha } = req.body
    const usr = await Usuario.findOne({ where: { email } })
    if (usr) {
      return res.status(409).json({ error: `Email ${email} já existe` })
    }

    const usuario = await Usuario.create({ nome, email, senha })
    res.status(201).json({ id: usuario.id, nome, email })
  }
}

module.exports = new UserController()

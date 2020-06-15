const Cliente = require('../models/Cliente')
const Yup = require('yup')

class ClienteController {
  async index (req, res) {
    const usuarios = await Cliente.findAll({
      attributes: ['id', 'nome', 'cpf']
    })
    res.status(200).json(usuarios)
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required().strict(),
      cpf: Yup.string().required()
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Falha de validação' })
    }

    const { nome, cpf } = req.body
    const usr = await Cliente.findOne({ where: { cpf } })
    if (usr) {
      return res.status(409).json({ error: `CPF ${cpf} já existe` })
    }

    const cli = await Cliente.create({ nome, cpf })
    res.status(201).json({ id: cli.id, nome, cpf })
  }
}

module.exports = new ClienteController()

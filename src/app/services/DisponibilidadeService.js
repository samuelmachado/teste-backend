const Agendamento = require('../models/Agendamento')
const Yup = require('yup')
const { Op } = require('sequelize')

class DisponibilidadeService {
  async listarLocacoes (req, res) {
    const { page = 1, limit = 5 } = req.query

    const agendamentos = await Agendamento.findAll({
      attributes: ['id', 'data_inicial', 'data_final', 'data_retirada', 'data_devolucao'],
      limit,
      offset: (page - 1) * limit,
      order: ['data_inicial']
    })
    res.json(agendamentos)
  }
}

module.exports = new DisponibilidadeService()

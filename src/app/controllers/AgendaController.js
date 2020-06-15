const { addDays } = require('date-fns')
const { Op } = require('sequelize')
const Agendamento = require('../models/Agendamento')
const Veiculo = require('../models/Veiculo')
const Modelo = require('../models/Modelo')
const Fabricante = require('../models/Fabricante')

class AgendaController {
  async index (req, res) {
    const {
      page = 1,
      limit = 5,
      dataInicial = new Date(),
      dataFinal = addDays(new Date(dataInicial), 10)
    } = req.query

    const agendamentos = await Agendamento.findAll({
      limit,
      offset: (page - 1) * limit,
      where: {
        data_inicial: {
          [Op.between]: [dataInicial, dataFinal]
        }
      },
      order: [['data_inicial', 'ASC']],
      attributes: [
        'id', 'data_inicial', 'data_final', 'data_devolucao'
      ],
      include: [
        {
          model: Veiculo,
          as: 'veiculo',
          attributes: ['placa']
        }
      ]
    })

    res.json(agendamentos)
  }

  async disponivel (req, res) {
    const { dataInicial = new Date(), unidade } = req.query

    if (!unidade) {
      res.status(400).json({ error: 'Obrigatorio informar a unidade' })
    }

    const agendamentosFinalizados = await Agendamento.findAll({
      where: {
        unidade_id: unidade,
        data_inicial: {
          [Op.gte]: dataInicial
        },
        data_devolucao: null
      },
      order: [['data_final', 'DESC']]
    })

    const v = agendamentosFinalizados.map(a => a.veiculo_id)

    const veiculos = await Veiculo.findAll({
      where: {
        id: {
          [Op.notIn]: v
        },
        unidade_id: unidade
      },
      include: [
        {
          model: Modelo,
          as: 'modelo',
          attributes: ['modelo'],
          include: [
            {
              model: Fabricante,
              as: 'fabricante',
              attributes: ['nome']
            }
          ]
        }
      ]
    })

    return res.status(200).json(veiculos.map(v => {
      const temp = {
        id: v.id,
        fabricante: v.modelo.fabricante.nome,
        modelo: v.modelo.modelo,
        placa: v.placa,
        cor: v.cor
      }
      return temp
    }))
  }
}

module.exports = new AgendaController()

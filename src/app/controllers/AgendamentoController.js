const Agendamento = require('../models/Agendamento')
const { format } = require('date-fns')
const Yup = require('yup')
const { Op } = require('sequelize')

class AgendamentoController {
  async checkin (req, res) {
    const schema = Yup.object().shape({
      cliente: Yup.number().required(),
      data_inicial: Yup.date().required(),
      data_final: Yup.date().required(),
      veiculo: Yup.number().required(),
      unidade: Yup.number().required()
    })

    const { cliente, data_inicial, data_final, veiculo, unidade } = req.body

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json(error.errors)
    }

    const agendamento = Agendamento.build({
      unidade_id: unidade,
      veiculo_id: veiculo,
      data_inicial,
      data_final
    })

    if (data_final <= data_inicial) {
      return res.json({ error: 'A data final não pode ser inferior a data inicial' })
    }

    if (!agendamento.validaDataLocacao) {
      return res.json({ error: 'A data da reserva não pode ser antes da data atual' })
    }
    if (!agendamento.validaDataFinal) {
      return res.json({ error: 'A reserva de veículo deve durar no máximo 3 dias' })
    }

    const disponivel = await Agendamento.findAll({
      where: {
        veiculo_id: veiculo,
        unidade_id: unidade,
        data_inicial: {
          [Op.gte]: data_inicial
        },
        data_final: {
          [Op.lte]: data_final
        }
      },
      order: [['data_final', 'DESC']]
    })

    if (disponivel.length !== 0) {
      const proxDataDisponivel = disponivel[0].data_final
      const dataFormatada = format(proxDataDisponivel, 'dd/MM/yyyy hh:mm')
      return res.json({ error: `Veículo indisponível nesta data. Este veículo estará disponível a partir de ${dataFormatada}` })
    }

    agendamento.cliente_id = cliente
    agendamento.atendente_id = req.userId

    const agen = await agendamento.save()

    return res.status(200).json({ agen })
  }

  async checkout (req, res) {
    const { id, dataDevolucao = new Date() } = req.body

    const agendamento = await Agendamento.findByPk(id)
    agendamento.data_devolucao = dataDevolucao

    res.json(await agendamento.save())
  }
}

module.exports = new AgendamentoController()

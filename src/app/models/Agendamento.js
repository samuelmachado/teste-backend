const { Model } = require('sequelize')
const Sequelize = require('sequelize')
const { isBefore, addDays } = require('date-fns')

class Agendamento extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      data_inicial: Sequelize.DATE,
      data_final: Sequelize.DATE,
      data_retirada: Sequelize.DATE,
      data_devolucao: Sequelize.DATE,
      validaDataLocacao: {
        type: Sequelize.VIRTUAL,
        get () {
          return isBefore(new Date(), this.data_inicial)
        }
      },
      validaDataFinal: {
        type: Sequelize.VIRTUAL,
        get () {
          return isBefore(this.data_final, addDays(this.data_inicial, 3)) && this.data_final > this.data_inicial
        }
      },
      finalizado: {
        type: Sequelize.VIRTUAL,
        get () {
          return !!this.data_devolucao
        }
      }
    },
    {
      sequelize
    })
    return this
  }

  static associate (models) {
    this.belongsTo(models.Unidade, { foreignKey: 'unidade_id', as: 'unidade' })
    this.belongsTo(models.Veiculo, { foreignKey: 'veiculo_id', as: 'veiculo' })
    this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' })
    this.belongsTo(models.Usuario, { foreignKey: 'atendente_id', as: 'usuario' })
  }
}

module.exports = Agendamento

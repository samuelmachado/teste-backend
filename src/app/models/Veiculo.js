const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class Veiculo extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      placa: Sequelize.STRING,
      cor: Sequelize.STRING
    },
    {
      sequelize
    })
    return this
  }

  static associate (models) {
    this.belongsTo(models.Unidade, { foreignKey: 'unidade_id', as: 'unidade' })
    this.belongsTo(models.Modelo, { foreignKey: 'modelo_id', as: 'modelo' })
  }
}

module.exports = Veiculo

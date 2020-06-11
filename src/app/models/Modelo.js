const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class Modelo extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      modelo: Sequelize.STRING,
      imagem: Sequelize.STRING
    },
    {
      sequelize
    })
    return this
  }

  static associate (models) {
    this.belongsTo(models.Fabricante, { foreignKey: 'fabricante_id', as: 'fabricante' })
  }
}

module.exports = Modelo

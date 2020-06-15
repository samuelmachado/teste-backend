const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class Cliente extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: Sequelize.STRING,
      cpf: Sequelize.STRING
    },
    {
      sequelize
    })
    return this
  }
}

module.exports = Cliente

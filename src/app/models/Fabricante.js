const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class Fabricante extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: Sequelize.STRING
    },
    {
      sequelize
    })
    return this
  }
}

module.exports = Fabricante

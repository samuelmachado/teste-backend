const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class Unidade extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    },
    {
      sequelize
    })
    return this
  }
}

module.exports = Unidade

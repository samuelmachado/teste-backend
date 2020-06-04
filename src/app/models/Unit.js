import Sequelize, { Model } from 'sequelize'

class Unit extends Model {
  static init (sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },    
      },
      {
        sequelize
      }
    )
    return this
  }
}

export default Unit
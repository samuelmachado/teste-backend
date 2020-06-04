import Sequelize, { Model } from 'sequelize'

class Car extends Model {
  static init (sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        plate: Sequelize.STRING,
        color: Sequelize.STRING,
      },
      {
        sequelize
      }
    )
    return this
  }
}

export default Car
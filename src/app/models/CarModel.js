import Sequelize, { Model } from 'sequelize'

class CarModel extends Model {
  static init (sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        name: Sequelize.STRING,
        pathImage: Sequelize.STRING
      },
      {
        sequelize
      }
    )
    return this
  }
}

export default CarModel
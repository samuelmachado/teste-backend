import Sequelize, { Model } from 'sequelize'

class CarModel extends Model {
  static init (sequelize) {
    super.init(
      {
        id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        pathImage: Sequelize.STRING
      },
      {
        sequelize
      }
    )
  }
}

export default CarModel
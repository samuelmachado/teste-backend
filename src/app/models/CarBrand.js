import Sequelize, { Model } from 'sequelize'

class CarBrand extends Model {
  static init (sequelize) {
    super.init(
      {
        id: Sequelize.INTEGER,
        name: Sequelize.STRING,
      },
      {
        sequelize
      }
    )
  }
}

export default CarBrand
import Sequelize, { Model } from 'sequelize'

class CarBrand extends Model {
  static init (sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        name: Sequelize.STRING,
      },
      {
        sequelize
      }
    )
    return this
  }
  
}

export default CarBrand
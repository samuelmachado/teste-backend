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
  static associate (models) {
    this.belongsTo(models.CarBrand, { foreignKey: 'CarBrandId', as: 'carBrandId' })
  }
}

export default CarModel
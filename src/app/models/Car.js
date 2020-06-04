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
  static associate (models) {
    this.belongsTo(models.Unit, { foreignKey: 'UnitId', as: 'units' })
    this.belongsTo(models.CarModel, { foreignKey: 'CarModelId', as: 'carModels' })
  }
}

export default Car
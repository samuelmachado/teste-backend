import Sequelize, { Model } from 'sequelize'

class Schedule extends Model {
  static init (sequelize) {
    super.init(
      {
        withdrawalDate: Sequelize.DATE,
        deliveryDate: Sequelize.DATE,
        canceledAt: Sequelize.DATE
      },
      {
        sequelize
      }
    )
    return this
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' })
    this.belongsTo(models.User, { foreignKey: 'CarId', as: 'provider' })
  }
}

export default Schedule
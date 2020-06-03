import Sequelize, { Model } from 'sequelize'


class Car extends Model {
  static init (sequelize) {
    super.init(
      {
        id: Sequelize.INTEGER,
        carPlate: Sequelize.STRING,
        color: Sequelize.STRING,
      },
      {
        sequelize
      }
    )
  }
}

export default Car
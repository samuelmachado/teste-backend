import Sequelize, { Model } from 'sequelize'

class Util extends Model {
  static init (sequelize) {
    super.init(
      {
        id: Sequelize.INTEGER,    
      },
      {
        sequelize
      }
    )
  }
}

export default Util
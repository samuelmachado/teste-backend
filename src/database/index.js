import Sequelize from 'sequelize'

import databaseConfig from '../config/database'

import User from '../app/models/User'
import CarBrand from '../app/models/CarBrand'
import CarModel from '../app/models/CarModel'
import Car from '../app/models/Car'
import Unit from '../app/models/Unit'
import Schedule from '../app/models/Schedule'

const models = [User, Car, CarBrand, Unit, CarModel, Schedule]

class Database {
  constructor () {
    this.init()
  }      

  init () {
    this.connection = new Sequelize(databaseConfig)

    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()

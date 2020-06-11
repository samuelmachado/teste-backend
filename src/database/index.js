const Sequelize = require('sequelize')

const Usuario = require('../app/models/Usuario')
const Unidade = require('../app/models/Unidade')
const Fabricante = require('../app/models/Fabricante')

const databaseConfig = require('../config/database')

const models = [Usuario, Unidade, Fabricante]

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

module.exports = new Database()

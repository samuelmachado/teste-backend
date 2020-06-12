const Sequelize = require('sequelize')

const Usuario = require('../app/models/Usuario')
const Unidade = require('../app/models/Unidade')
const Fabricante = require('../app/models/Fabricante')
const Modelo = require('../app/models/Modelo')
const Veiculo = require('../app/models/Veiculo')

const databaseConfig = require('../config/database')

const models = [Usuario, Unidade, Fabricante, Modelo, Veiculo]

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

const { Model } = require('sequelize')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

class Usuario extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: Sequelize.STRING,
      email: Sequelize.STRING,
      senha: Sequelize.VIRTUAL,
      senha_hash: Sequelize.STRING
    },
    {
      sequelize
    })

    this.addHook('beforeSave', async (usuario) => {
      if (usuario.senha) {
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8)
      }
    })
    return this
  }

  checkPassword (senha) {
    return bcrypt.compare(senha, this.senha_hash)
  }
}

module.exports = Usuario

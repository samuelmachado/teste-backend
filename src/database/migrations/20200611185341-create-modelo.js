'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('modelos',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        modelo: {
          type: Sequelize.STRING
        },
        imagem: {
          type: Sequelize.STRING
        },
        fabricante_id: {
          type: Sequelize.INTEGER,
          references: { model: 'fabricantes', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('modelos')
  }
}

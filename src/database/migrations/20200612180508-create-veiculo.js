'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('veiculos',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        placa: Sequelize.STRING,
        cor: Sequelize.STRING,
        unidade_id: {
          type: Sequelize.INTEGER,
          references: { model: 'unidades', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        modelo_id: {
          type: Sequelize.INTEGER,
          references: { model: 'modelos', key: 'id' },
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
    return queryInterface.dropTable('veiculos')
  }
}

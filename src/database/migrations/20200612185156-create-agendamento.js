'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('agendamentos',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        data_inicial_reserva: {
          type: Sequelize.DATE,
          allowNull: false
        },
        data_final_reserva: {
          type: Sequelize.DATE,
          allowNull: false
        },
        data_devolucao: {
          type: Sequelize.DATE,
          allowNull: true
        },
        cliente_id: {
          type: Sequelize.INTEGER,
          references: { model: 'clientes', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        unidade_id: {
          type: Sequelize.INTEGER,
          references: { model: 'unidades', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        veiculo_id: {
          type: Sequelize.INTEGER,
          references: { model: 'veiculos', key: 'id' },
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
    return queryInterface.dropTable('agendamentos')
  }
}

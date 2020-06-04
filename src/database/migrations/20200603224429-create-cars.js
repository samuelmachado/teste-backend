'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('Cars', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      plate: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Unit_id: {
      //   type: Sequelize.INTEGER,
      //   references: { model: 'units', key: 'id' },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      //   allowNull: true
      // },
      // carModel_id: {
      //   type: Sequelize.INTEGER,
      //   references: { model: 'carModels', key: 'id' },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      //   allowNull: true
      // },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('Cars');
  }
};

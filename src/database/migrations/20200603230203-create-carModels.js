'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('carModels', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pathImage: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      carBrand_id: {
        type: Sequelize.INTEGER,
        references: { model: 'carBrands', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },

    });

  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('users');
    
  }
};

'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mediid: {
        type: Sequelize.INTEGER
      },
      MedName: {
        type: Sequelize.STRING
      },
      Price: {
        type: Sequelize.INTEGER
      },
      Manufacturer: {
        type: Sequelize.STRING
      },
      Dosage: {
        type: Sequelize.STRING
      },
      Duration: {
        type: Sequelize.STRING
      },
      AppointmentId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Ensure the foreign key does not allow null values
        references: {
          model: 'Appointments', // Name of the referenced model
          key: 'id', // Name of the referenced column (primary key)
        },
        onDelete: 'CASCADE', // Define the onDelete behavior
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Meds');
  }
};

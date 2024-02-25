'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicineRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MedName: {
        type: Sequelize.STRING
      },
      ExpiryDate: {
        type: Sequelize.DATE
      },
      Price: {
        type: Sequelize.FLOAT
      },
      Manufacturer: {
        type: Sequelize.STRING
      },
      Units: {
        type: Sequelize.INTEGER
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients', // Name of the referenced table
          key: 'id', // Primary key of the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('MedicineRecords');
  }
};

// Payment migration file

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TransactionId: {
        type: Sequelize.STRING
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients', // Make sure this matches the actual table name for Patients
          key: 'id', // Assuming 'id' is the primary key of the Patients table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Adjust based on your requirements
      },
      PaymentMethod: {
        type: Sequelize.STRING
      },
      DateTime: {
        type: Sequelize.DATE
      },
      PayerName: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Payments');
  }
};

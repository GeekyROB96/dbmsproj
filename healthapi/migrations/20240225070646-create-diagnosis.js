'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Diagnoses', {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appointmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Appointments', // Replace with the actual name of your Appointment model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      doctorName: {
        type: Sequelize.STRING
      },
      diagnosedFor: {
        type: Sequelize.STRING
      },
      diagnosisDate: {
        type: Sequelize.DATE
      },
      reason: {
        type: Sequelize.STRING
      },
      measures: {
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
    await queryInterface.dropTable('Diagnoses');
  }
};

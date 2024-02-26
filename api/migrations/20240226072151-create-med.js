'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meds', {
      mediid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
        allowNull: false,
        references: {
          model: 'Appointments', // Assuming your Appointment model is named 'Appointment'
          key: 'id' // Assuming 'id' is the primary key of the Appointment model
        },
        onDelete: 'CASCADE' // Cascade delete when associated Appointment is deleted
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
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, AppointmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
     
      PatientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients', // Name of the referenced table
          key: 'id', // Primary key of the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Use ON DELETE CASCADE here
      },
      AppointmentDate: {
        type: Sequelize.DATE
      },
      Symptoms: {
        type: Sequelize.STRING
      },
      AppointmentTime: {
        type: Sequelize.TIME
      },
      Remarks: {
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
    await queryInterface.dropTable('Appointments');
  }
};

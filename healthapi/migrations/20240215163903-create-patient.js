'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PatientName: {
        type: Sequelize.STRING
      },
      PatientEmail: {
        type: Sequelize.STRING
      },
      PatientPassword: {
        type: Sequelize.STRING
      },
      PatientDOB: {
        type: Sequelize.DATE
      },
      Address: {
        type: Sequelize.STRING
      },
      ContactNo: {
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
    await queryInterface.dropTable('Patients');
  }
};
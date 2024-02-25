'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Doctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DoctorEmail: {
        type: Sequelize.STRING
      },
      DoctorPassword: {
        type: Sequelize.STRING
      },
      DoctorName: {
        type: Sequelize.STRING
      },
      Availability: {
        type: Sequelize.STRING
      },
      Specialization: {
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
    await queryInterface.dropTable('Doctors');
  }
};
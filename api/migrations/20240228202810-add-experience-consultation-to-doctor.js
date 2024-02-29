'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Doctors', 'Experience', {
      type: Sequelize.STRING,
      allowNull: true, // You can modify this based on your requirements
    });

    await queryInterface.addColumn('Doctors', 'ConsultationFee', {
      type: Sequelize.INTEGER,
      allowNull: true, // You can modify this based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Doctors', 'Experience');
    await queryInterface.removeColumn('Doctors', 'ConsultationFee');
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Doctors', 'ConsultationFee', {
      type: Sequelize.INTEGER,
      defaultValue: 100,
    });

    await queryInterface.changeColumn('Doctors', 'Experience', {
      type: Sequelize.STRING,
      defaultValue: 'Not Specified',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Doctors', 'ConsultationFee', {
      type: Sequelize.INTEGER,
      defaultValue: null, // Revert back to NULL
    });

    await queryInterface.changeColumn('Doctors', 'Experience', {
      type: Sequelize.STRING,
      defaultValue: null, // Revert back to NULL
    });
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the column 'ContactNo' to 'Contact'
    await queryInterface.renameColumn('Doctors', 'ContactNo', 'Contact', {
      type: Sequelize.STRING,
      allowNull: true, // Modify this based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the column name back to 'ContactNo'
    await queryInterface.renameColumn('Doctors', 'Contact', 'ContactNo', {
      type: Sequelize.STRING,
      allowNull: true, // Modify this based on your requirements
    });
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Payments', 'TransactionId', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Payments', 'TransactionId', {
      type: Sequelize.INTEGER,
    });
  },
};

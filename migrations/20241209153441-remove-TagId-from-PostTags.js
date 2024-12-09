'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('PostTags', 'TagId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('PostTags', 'TagId', {
      type: Sequelize.INTEGER,
      allowNull: true, 
    });
  },
};

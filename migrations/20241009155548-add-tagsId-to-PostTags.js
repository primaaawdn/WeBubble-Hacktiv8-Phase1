'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('PostTags', 'TagsId',
      { type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id'
        }
       });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('PostTags', 'TagsId');
  }
};

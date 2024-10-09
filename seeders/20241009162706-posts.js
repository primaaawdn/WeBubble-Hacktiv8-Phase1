'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/posts.json').map((e) =>
    {
      delete e.id
      e.createdAt = e.updatedAt = new Date()
      return e
    })

    await queryInterface.bulkInsert('Posts', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};

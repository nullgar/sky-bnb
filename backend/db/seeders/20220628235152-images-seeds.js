'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Images', [
    {
      locationId: 1,
      url: 'https://images.uesp.net/7/7c/SR-place-The_Bannered_Mare.jpg'
     },
     {
      locationId: 1,
      url: 'https://images.uesp.net/7/7c/SR-place-The_Bannered_Mare.jpg'
     },
     {
      locationId: 1,
      url: 'https://images.uesp.net/7/7c/SR-place-The_Bannered_Mare.jpg'
     }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Images', null, {});
  }
};

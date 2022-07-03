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
      locationId: 2,
      url: 'https://images.uesp.net/7/7c/SR-place-The_Bannered_Mare.jpg'
     },
     {
      locationId: 3,
      url: 'https://images.uesp.net/thumb/4/44/SR-place-Sleeping_Giant_Inn.jpg/800px-SR-place-Sleeping_Giant_Inn.jpg'
     },
     {
      locationId: 1,
      url: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2021/07/Skyrim-The-Chill-Secret-Location.jpg'
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

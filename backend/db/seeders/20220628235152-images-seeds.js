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
     },
     {
      locationId: 4,
      url: 'https://images.uesp.net/6/63/SR-place-The_Frozen_Hearth.jpg'
     },
     {
      locationId: 5,
      url: 'https://images.uesp.net/2/27/SR-place-Frostfruit_Inn.jpg'
     },
     {
      locationId: 6,
      url: 'https://images.uesp.net/thumb/7/72/SR-place-The_Retching_Netch.jpg/1600px-SR-place-The_Retching_Netch.jpg'
     },
     {
      locationId: 7,
      url: 'https://images.uesp.net/9/9f/SR-place-The_Bee_and_Barb.jpg'
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

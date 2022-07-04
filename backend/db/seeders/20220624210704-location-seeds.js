'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Locations', [
    {
      userId: 6,
      address: 'Over Yonder',
      city: 'A bedroll in the wilderness',
      country: 'Skyrim',
      name: 'Nullgars Ultra Secret Location',
      price: 2500
     },
    {
    userId: 4,
    address: 'The Plains District',
    city: 'Whiterun',
    country: 'Skyrim',
    name: 'The Bannered Mare',
    price: 25
   },
   {
    userId: 5,
    address: 'Riverwood Drive',
    city: 'Riverwood',
    country: 'Skyrim',
    name: 'Sleeping Giant Inn',
    price: 10
   },
   {
    userId: 7,
    address: '5454 Winterhold Lane',
    city: 'Winterhold',
    country: 'Skyrim',
    name: 'The Frozen Hearth',
    price: 12
   },
   {
    userId: 8,
    address: '23 Ct',
    city: 'Rorikstead',
    country: 'Skyrim',
    name: 'Frostfruit Inn',
    price: 23
   },
   {
    userId: 9,
    address: '44 Netch Ave',
    city: 'Raven Rock',
    country: 'Solstheim',
    name: 'The Retching Netch',
    price: 14
   },
   {
    userId: 10,
    address: '122 Riften Dr',
    city: 'Riften',
    country: 'Skyrim',
    name: 'The Bee and Barb',
    price: 10
   }

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Locations', null, {});
  }
};

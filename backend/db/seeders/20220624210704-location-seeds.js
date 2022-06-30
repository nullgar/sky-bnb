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
   }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Locations', null, {});
  }
};

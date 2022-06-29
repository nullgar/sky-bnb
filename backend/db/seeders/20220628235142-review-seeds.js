'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [
    {
     userId: 2,
     locationId: 2,
     review: "Danm Skeevers ate my sweetroll",
     rating: 2,
    },
    {
    userId: 2,
     locationId: 2,
     review: "Hulda is mean!",
     rating: 2,
    },
    {
      userId: 1,
       locationId: 3,
       review: "Took an arrow to the knee, but the mead is good!",
       rating: 2,
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};

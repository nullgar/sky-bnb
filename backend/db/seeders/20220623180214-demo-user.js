'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Drakon',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'Farangar',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'Peter',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'hulda@skybnb.com',
        username: 'Hulda',
        hashedPassword: bcrypt.hashSync('SkyrimRocks@1')
      },
      {
        email: 'orgnar@skybnb.com',
        username: 'orgnar',
        hashedPassword: bcrypt.hashSync('SkyrimRocks@2')
      },
      {
        email: 'nullgar@skybnb.com',
        username: 'nullgar',
        hashedPassword: bcrypt.hashSync('testing@1')
      },
      {
        email: 'Haran@skybnb.com',
        username: 'Haran',
        hashedPassword: bcrypt.hashSync('testing@2')
      },
      {
        email: 'Mralki@skybnb.com',
        username: 'Mralki',
        hashedPassword: bcrypt.hashSync('testing@3')
      },
      {
        email: 'geldis@skybnb.com',
        username: 'Geldis Sadri',
        hashedPassword: bcrypt.hashSync('testing@4')
      },
      {
        email: 'keerava@skybnb.com',
        username: 'Keerava',
        hashedPassword: bcrypt.hashSync('testing@5')
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

  return Promise.all([
    queryInterface.removeColumn('OrderItem', 'createdAt'),
    queryInterface.removeColumn('OrderItem', 'updatedAt')
  ])
  },

  down: (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.addColumn(
        'OrderItem',
        'createdAt',
        {
          type: Sequelize.DATE
        }
    ),
    queryInterface.addColumn(
        'OrderItem',
        'updatedAt',
        {
          type: Sequelize.DATE
        }
    ),
  ])
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

  return Promise.all([
    queryInterface.changeColumn(
        'OrderItem',
        'buyer_id',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        }
    )
  ])
  },

  down: (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.changeColumn(
        'OrderItem',
        'buyer_id',
        {
          type: Sequelize.number,
          allowNull: false,
          defaultValue: 0
        }
    )
  ])
  }
};

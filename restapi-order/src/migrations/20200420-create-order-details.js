'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('OrderItem', {
    details_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    product_id: {
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    price:{
      type: Sequelize.INTEGER
    }
  })
},
    down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('OrderItem');
}
};
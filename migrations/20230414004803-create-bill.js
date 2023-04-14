'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      billingAmount: {
        type: Sequelize.FLOAT
      },
      numberOfMinutesUsed: {
        type: Sequelize.INTEGER
      },
      numberOfTextsSent: {
        type: Sequelize.INTEGER
      },
      amountOfDataConsumed: {
        type: Sequelize.FLOAT
      },
      numberOfOutgoingCallsMade: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bills');
  }
};
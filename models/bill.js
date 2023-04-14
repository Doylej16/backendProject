'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bill.init({
    billingAmount: DataTypes.FLOAT,
    numberOfMinutesUsed: DataTypes.INTEGER,
    numberOfTextsSent: DataTypes.INTEGER,
    amountOfDataConsumed: DataTypes.FLOAT,
    numberOfOutgoingCallsMade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bill',
  });
  return bill;
};
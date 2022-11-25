'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transactions.belongsTo(models.Accounts, { foreignKey: 'debitedAccountId', as: 'debitedAccount' })
      Transactions.belongsTo(models.Accounts, { foreignKey: 'creditedAccountId', as: 'creditedAccount' })
    }
  }
  Transactions.init({
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};
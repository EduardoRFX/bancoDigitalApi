'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Accounts.hasOne(models.Users, { foreignKey: 'accountId', as: 'account' })
      Accounts.hasMany(models.Transactions, { foreignKey: 'debitedAccountId', as: 'debitedAccount' })
      Accounts.hasMany(models.Transactions, { foreignKey: 'creditedAccountId', as: 'creditedAccount' })

    }
  }
  Accounts.init({
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Accounts',
  });
  return Accounts;
};
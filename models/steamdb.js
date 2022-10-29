'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SteamDB extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SteamDB.init({
    idSteamDB: DataTypes.STRING,
    games: DataTypes.ARRAY(DataTypes.STRING),
    publisher: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SteamDB',
  });
  return SteamDB;
};
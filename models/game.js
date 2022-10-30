'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game.init({
    idGame: DataTypes.STRING,
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    description: DataTypes.STRING(500),
    price: DataTypes.INTEGER,
    dateReleased: DataTypes.DATE,
    genre: DataTypes.ARRAY(DataTypes.STRING),
    publisher: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
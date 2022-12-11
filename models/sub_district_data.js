'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_district_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sub_district_data.init({
    districtName: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    description: DataTypes.TEXT,
    picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'sub_district_data',
  });
  return sub_district_data;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CityDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      CityDetails.belongsTo(models.Admins, {
        foreignKey: 'adminId'
      });

      CityDetails.belongsTo(models.Cities, {
        foreignKey: 'cityId'
      });

      CityDetails.belongsTo(models.RiskLevels, {
        foreignKey: 'riskLevelId'
      });

    }
  }
  CityDetails.init({
    adminId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
    riskLevelId: DataTypes.INTEGER,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    description: DataTypes.TEXT,
    picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CityDetails',
  });
  return CityDetails;
};
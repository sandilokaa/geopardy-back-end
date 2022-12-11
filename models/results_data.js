'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class results_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  results_data.init({
    userId: DataTypes.INTEGER,
    subDistrictId: DataTypes.INTEGER,
    riskLevelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'results_data',
  });
  return results_data;
};
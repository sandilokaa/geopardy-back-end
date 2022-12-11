'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class risk_levels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  risk_levels.init({
    riskLevel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'risk_levels',
  });
  return risk_levels;
};
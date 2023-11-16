'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RiskLevels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      RiskLevels.belongsTo(models.Admins, {
        foreignKey: 'adminId'
      });
      
    }
  }
  RiskLevels.init({
    adminId: DataTypes.INTEGER,
    riskLevel: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RiskLevels',
  });
  return RiskLevels;
};
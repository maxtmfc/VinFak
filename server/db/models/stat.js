"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stat extends Model {
    static associate({ User, Wine }) {
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Wine, { foreignKey: "wineId", onDelete:'SET NULL' });
    }
  }
  Stat.init(
    {
      userId: DataTypes.INTEGER,
      wineId: DataTypes.INTEGER,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Stat",
    }
  );
  return Stat;
};

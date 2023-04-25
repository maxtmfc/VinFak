"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wine extends Model {
    static associate({ Category, Stat }) {
      this.belongsTo(Category, { foreignKey: "categoryId" });
      this.hasMany(Stat, { foreignKey: "wineId", onDelete:'SET NULL' });
    }
  }
  Wine.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      archived: DataTypes.BOOLEAN,
      priceStudent: DataTypes.INTEGER,
      priceBakalavr: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Wine",
    }
  );
  return Wine;
};

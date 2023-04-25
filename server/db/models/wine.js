"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wine extends Model {
    static associate({ Category, Stat }) {
      this.belongsTo(Category, { foreignKey: "categoryId" });
      this.hasMany(Stat, { foreignKey: "wineId" });
    }
  }
  Wine.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
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

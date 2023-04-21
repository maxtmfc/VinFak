"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({ Wine }) {
      this.hasMany(Wine, { foreignKey: "categoryId" });
    }
  }
  Category.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};

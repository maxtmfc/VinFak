"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate({ User }) {
      this.hasMany(User, { foreignKey: "statusId" });
    }
  }
  Status.init(
    {
      title: DataTypes.STRING,
      discount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Status",
    }
  );
  return Status;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Status, Stat }) {
      this.belongsTo(Status, { foreignKey: "statusId" });
      this.hasMany(Stat, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      telephone: DataTypes.STRING,
      hashpass: DataTypes.STRING,
      image: DataTypes.STRING,
      admin: DataTypes.STRING,
      statusDate: DataTypes.DATE,
      uuid:DataTypes.STRING,
      statusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

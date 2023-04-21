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
      nickName: DataTypes.STRING,
      email: DataTypes.STRING,
      oauthId: DataTypes.STRING,
      hashpass: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      image: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      statusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

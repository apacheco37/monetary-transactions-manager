import { Sequelize, DataTypes } from "sequelize";

module.exports = (sequelize: Sequelize) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
  
    return User;
};

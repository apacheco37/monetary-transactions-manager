import { DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
    const Account = sequelize.define("Account", {
        capital: DataTypes.FLOAT
    });
  
    return Account;
};

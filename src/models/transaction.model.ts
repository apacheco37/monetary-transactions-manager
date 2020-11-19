import { DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
    const Transaction = sequelize.define("Transaction", {
        amount: DataTypes.INTEGER,
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        description: DataTypes.STRING
    });
  
    return Transaction;
};

import { DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
    const Transaction = sequelize.define("Transaction", {
        amount: DataTypes.FLOAT,
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        description: DataTypes.STRING
    });
  
    return Transaction;
};

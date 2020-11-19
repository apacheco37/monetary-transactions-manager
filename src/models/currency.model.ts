import { DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
    const Currency = sequelize.define("Currency", {
        code: {
            type: DataTypes.STRING(3),
            allowNull: false,
            unique: true
        },
        name: DataTypes.STRING
    });
  
    return Currency;
};

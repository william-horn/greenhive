const { Model, DataTypes } = require('sequelize');
const sequelizeConnection = require('../config/sequelizeConnection');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    page_visits: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelizeConnection,
    modelName: 'user',
    tableName: 'users',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = User;

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
        allowNull: false,
        validate: { 
            len: [3, 25], 
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 30], 
            notEmpty: true 
        }
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

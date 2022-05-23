const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelizeConnection = require('../config/sequelizeConnection');

const User = sequelizeConnection.define('user', {
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
},
{
    sequelize: sequelizeConnection,
    modelName: 'user',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;

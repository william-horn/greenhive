const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
//
const { accountSettings } = require('../user_settings');
const { passwordCriteria, usernameCriteria } = accountSettings;
//
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
            len: [usernameCriteria.minLength, usernameCriteria.maxLength], 
            notEmpty: usernameCriteria.notEmpty
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [passwordCriteria.minLength, passwordCriteria.maxLength], 
            notEmpty: passwordCriteria.notEmpty
        }
    },
    profile_img: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    page_visits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    profile_visits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }

},
{
    sequelize: sequelizeConnection,
    modelName: 'user',
    freezeTableName: true,
    underscored: true,
    // timestamps: false
});

User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;

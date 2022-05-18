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
    }
}, {
    sequelize: sequelizeConnection,
    modelName: 'user',
    tableName: 'users',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

console.log('user model was created');

module.exports = User;

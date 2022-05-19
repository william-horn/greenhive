
/*
    WORK IN PROGRESS


    const { Model, DataTypes } = require('sequelize');
    const sequelizeConnection = require('../config/sequelizeConnection');

    class Posts extends Model {}

    Posts.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: sequelizeConnection,
        modelName: 'posts',
        freezeTableName: true,
        underscored: true,
        timestamps: false
    });

    module.exports = Posts;
*/

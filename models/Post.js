const { Model, DataTypes } = require('sequelize');
const sequelizeConnection = require('../config/sequelizeConnection');

const Post = sequelizeConnection.define('post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    sequelize: sequelizeConnection,
    modelName: 'post',
    freezeTableName: true,
    underscored: true,
    // timestamps: false
});

module.exports = Post;

const { Sequelize, DataTypes } = require('sequelize');

const config = require('./config')

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
)

module.exports = sequelize.define('Students', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'students'
});
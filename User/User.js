const Sequelize = require('sequelize');
const database = '../database/database';
const connection = require(database);


const User = connection.define('users',{
    nick: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    terms: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
});

User.sync({force:false})
module.exports = User;
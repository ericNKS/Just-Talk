const Sequelize = require('sequelize');
const database = '../../../database/database';
const connection = require(database);
const User = require('../User');


const Amizade = connection.define('amizades',{
    friendId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

User.hasMany(Amizade);

Amizade.sync({force: false});

module.exports = Amizade;
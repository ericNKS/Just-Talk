const Sequelize = require('sequelize');
const Conteudo = require('../Conteudo');
const User = require('../../User/User');
const database = '../../../database/database';
const connection = require(database);

const Like = connection.define('likes',{
    userId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    conteudoId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Like.sync({force:false})

Conteudo.hasMany(Like);
Like.belongsTo(User);

module.exports = Like;


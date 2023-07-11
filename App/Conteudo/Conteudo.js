const Sequelize = require('sequelize');
const User = require('../User/User');
const database = '../../database/database';
const connection = require(database);


const Conteudo = connection.define('conteudos',{
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

Conteudo.belongsTo(User);
User.hasMany(Conteudo);

Conteudo.sync({force:false})
module.exports = Conteudo;
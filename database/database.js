const Sequelize = require('sequelize');

const conn = new Sequelize('just_talk','root','root',{
    host:'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
});

module.exports = conn;
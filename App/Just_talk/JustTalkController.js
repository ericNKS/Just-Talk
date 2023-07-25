const express = require("express");
const router = express.Router();
const Auth = require('../middleware/AuthMiddleware');
const session = require('express-session');
const Conteudo = require('../Conteudo/Conteudo');
const User = require("../User/User");
const Amizade = require("../User/Amizade/Amizade");
const CountAmizades = require("../User/Amizade/CountAmizades");
const database = require('../../database/database');
const GetFriendsConteduos = require("../Conteudo/GetFrindsConteudos");
const GetAllConteudos = require("../Conteudo/GetAllConteudos");

router.get('/',(req,res)=>{

    res.render('index');

});

router.get('/home', Auth, async(req,res)=>{
    let id = req.session.user.id;

    try {
        let amigosConteudos = await GetFriendsConteduos(id);
        let meusConteudos = await GetAllConteudos(id);
        let conteudosJuntos = amigosConteudos.concat(meusConteudos)
        conteudosJuntos.sort((a, b) => b.createdAt - a.createdAt);

        //res.json(amigosConteudos);
        res.render('home', {conteudos: conteudosJuntos, user: req.session.user});

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;
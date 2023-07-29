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
    let user = req.session.user
    let id = user.id;

    try {
        let amigosConteudos = await GetFriendsConteduos(id);
        let meusConteudos = await GetAllConteudos(id);
        let conteudosJuntos = amigosConteudos.concat(meusConteudos)
        conteudosJuntos.sort((a, b) => b.createdAt - a.createdAt);

        //res.json(amigosConteudos);
        res.render('home', {conteudos: conteudosJuntos, user});

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/explorar',Auth, async (req,res)=>{
    console.log('chegou na rotar explorar');
    try {
        let GettedConteudos = await GetAllConteudos();
        //res.json(GettedConteudos)
        res.render('explorar', {conteudos: GettedConteudos, user: req.session.user, explorar: true});

    } catch (error) {
        console.log(error);
        res.redirect('/home');
        return;
    }

});

module.exports = router;
const express = require("express");
const router = express.Router();
const Auth = require('../middleware/AuthMiddleware');
const session = require('express-session');
const Conteudo = require('../Conteudo/Conteudo');
const User = require("../User/User");

router.get('/',(req,res)=>{

    res.render('index');

});

router.get('/home', Auth, (req,res)=>{
    let id = req.session.user.id;

    Conteudo.findAll({
        include: [
            {
                model:User
            }
        ],
        order:[
            ['createdAt', 'DESC']
        ]
    })
    .then(conteudos=>{
        console.log(conteudos.user);
        res.render('home', {conteudos: conteudos});
    })
    .catch((err)=>{
        console.log(err);
        res.redirect('/home');
        return;
    });

});

module.exports = router;
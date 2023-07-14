const express = require("express");
const router = express.Router();
const Auth = require('../middleware/AuthMiddleware');
const session = require('express-session');
const Conteudo = require('../Conteudo/Conteudo');
const User = require("../User/User");
const Amizade = require("../User/Amizade/Amizade");
const CountAmizades = require("../User/Amizade/CountAmizades");
const database = require('../../database/database');

router.get('/',(req,res)=>{

    res.render('index');

});

router.get('/home', Auth, async(req,res)=>{
    let id = req.session.user.id;

    console.log('passou aqui antes de pegar os conteudos');
    database.query(
        `
            SELECT c.body, userFriend.nick as nick, c.createdAt
                FROM
                    amizades as f left join users as u on(u.id = f.userId) 
                    right join conteudos as c on (c.userId = f.friendId) 
                    inner join users as userFriend on(userFriend.id = f.friendId) 
                WHERE 
                    u.id = ${id}
                        or
                    c.userId = ${id}
                ORDER BY
                    c.createdAt DESC;

        `
        )
        .then((conteudos)=>{
            console.log('Corrigir erro de duplicação');
            res.render('home', {conteudos: conteudos[0], user: req.session.user});
            //res.send(conteudos);
        })
        .catch(err=>{
            {
                console.log("passou aqui no erro");
                console.log(err);
                res.redirect('/');
                return;
            }
        })


    // codigo antigo
    /*
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
        
        res.render('home', {conteudos: conteudos, user: req.session.user});
    })
    .catch((err)=>{
        console.log(err);
        res.redirect('/');
        return;
    });
    */

});

module.exports = router;
const express = require("express");
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const { Op } = require('sequelize');
const Auth = require("../middleware/AuthMiddleware");
const Conteudo = require("../Conteudo/Conteudo");
const Amizade = require("./Amizade/Amizade");
const CountAmizades = require("./Amizade/CountAmizades");


router.post('/store',(req,res)=>{
    let {nick, email, password, password_confirm, agree_terms} =  req.body;
    
    User.findOne({
        where:{
            [Op.or]: [
                { email: email },
                { nick: nick }
              ]
        }
    }).then((user) => {

        if (user == undefined) {

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            if(bcrypt.compareSync(password_confirm, hash)){
                if(agree_terms != undefined){
                    User.create({
                        nick,
                        email,
                        password: hash,
                        terms: true
                    }).then((user) => {
                        req.session.user = {
                            id: user.id,
                            nick: user.nick
                        }
                        res.redirect('/home');
                    }).catch((err) => {
                        res.send(err);
                        return;
                    });
                }else{
                    res.statusCode = 400;
                    res.json({erro: "Voce nao aceitou o termo"});
                    return;
                }
            }else{
                res.statusCode = 400;
                res.json({erro: "Senhas diferente"});
                return;
            }

        }else{
            if(nick == user.nick){
                res.statusCode = 400;
                res.json({erro: "Nick ja existente"});
                return;
            }
            if(email == user.email){
                res.statusCode = 400;
                res.json({erro: "Email ja existente"});
                return;
            }
        }


    }).catch((err) => {
        res.send(err);
        return;
    });

});

router.post('/login',(req,res)=>{
    let {email, password} = req.body;

    User.findOne({
        where:{
            email: email
        }
    }).then((user) => {
        if (user) {
            let correct_password = bcrypt.compareSync(password, user.password);

            if (correct_password) {
                req.session.user = {
                    id: user.id,
                    nick: user.nick
                }
                res.redirect('/home');
            }else{
                res.json({erro: "A senha esta incorreta"});
            }

        }else{
            res.json({erro: "O usuario nao foi encontrado"});
        }
    }).catch((err) => {
        res.json('erro');
    });
});

router.post('/logout', (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
});



router.get('/u/:nick', Auth, (req,res)=>{
    let userId = req.session.user.id;
    let nick = req.params.nick;

    if (nick != undefined || nick != '') {
        User.findOne({
            where:{
                nick: nick
            },
            include: [Conteudo],
            order: [
                [Conteudo, 'createdAt', 'DESC']
            ]
        }).then((user) => {
            let friendId = user.id;
            Amizade.findOne({
                where:{
                    friendId: friendId,
                    userId: userId
                }
            }).then(async(amigos)=>{

                let countAmizades = await CountAmizades(user.id)
                console.log(countAmizades);
                if (amigos != undefined) {
                    //res.json(user);
                    res.render('user/paginaUsuario', {user: req.session.user, conteudos: user.conteudos, userFound: user, amigos:true, countAmizades});
                }else{
                    //res.json(user);
                    res.render('user/paginaUsuario', {user: req.session.user, conteudos: user.conteudos, userFound: user, amigos:false, countAmizades});
                }


            }).catch(err=>{
                console.log(err);
                res.redirect('/home');
            });


        }).catch((err) => {
            res.redirect('/home');
        });


    } else {
        res.redirect('/home');
    }
    
});

router.post('/u/search', async(req,res)=>{
    let nick = req.body.nick;

    if (nick != undefined || nick != '') {
        User.findAll({
            where: {
              nick: {
                [Op.like]: `%${nick}%`
              }
            }
          }).then((users) => {
            res.render('user/searchUser', {user: req.session.user, users});
          }).catch((err) => {
            console.log(err);
            res.redirect('/home');
            return;
          });
    } else {
        
    }
});



module.exports = router;
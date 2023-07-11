const express = require("express");
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const { Op } = require('sequelize');


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

module.exports = router;
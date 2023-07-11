const express = require("express");
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');


router.post('/store',(req,res)=>{
    let {nick, email, password, password_confirm, agree_terms} =  req.body;
/*
    if (nick == undefined || nick == '') {
        res.redirect('/');
    }
    if (email == undefined || email == '') {
        res.redirect('/');
    }
    if (password == undefined || password == '') {
        res.redirect('/');
    }
    if (password_confirm == undefined || password_confirm == '') {
        res.redirect('/');
    }
    if (agree_terms == undefined || agree_terms == '') {
        res.redirect('/');
    }else{
        agree_terms = true;
    }
*/
    
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
                    }).then(() => {
                        res.send("cadastrado");
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

    //res.json({nick, email, password, password_confirm, agree_terms});
});

module.exports = router;
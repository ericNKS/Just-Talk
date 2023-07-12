const express = require("express");
const router = express.Router();
const User = require('../User');
const session = require('express-session');
const { Op } = require('sequelize');
const Auth = require("../../middleware/AuthMiddleware");
const Amizade = require("./Amizade");

router.post('/follow',Auth, async (req,res)=>{
    let nick = req.session.user.nick;
    let userId = req.session.user.id;
    let friendId = req.body.friendId;

    if(friendId != undefined || friendId !=''){

        if(friendId != userId){
            await Amizade.create({
                 friendId,
                 userId
            }).catch(err=>{
                console.log(err);
                res.redirect('/home');
                return;
            });
            User.findByPk(friendId).then(user=>{
                res.redirect(`/u/${user.nick}`)
            })
        }else{
            res.redirect('/u/'+nick);
        }

    }else{
        res.redirect('/home');
    }

});


module.exports = router;
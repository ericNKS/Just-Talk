const express = require("express");
const router = express.Router();
const User = require('../User');
const session = require('express-session');
const { Op, where } = require('sequelize');
const Auth = require("../../middleware/AuthMiddleware");
const Amizade = require("./Amizade");

router.post('/follow',Auth, (req,res)=>{
    let nick = req.session.user.nick;
    let userId = req.session.user.id;
    let friendId = req.body.friendId;
    let friendNick = req.body.friendNick;

    if(friendId != undefined || friendId !=''){

        if(friendId != userId){

            Amizade.create({
                 friendId,
                 userId
            }).then(()=>{
                
                res.redirect(`/u/${friendNick}`)
            }).catch(err=>{
                console.log(err);
                res.redirect('/home');
                return;
            });
            
        }else{
            res.redirect('/u/'+nick);
        }

    }else{
        res.redirect('/home');
    }

});

router.post('/unfollow', Auth, async (req,res)=>{
    let nick = req.session.user.nick;
    let userId = req.session.user.id;
    let friendId = req.body.friendId;
    let friendNick = req.body.friendNick;

    let amizade = await Amizade.findOne({
        where: {
            userId,
            friendId
        }
    })
    .catch(err=>{
        res.redirect(`/u/${friendNick}`);
    });

    let unfollow = await Amizade.destroy({
        where: {
            id: amizade.id
        }
    }).catch(err=>{
        console.log(err);
        res.redirect(`/u/${friendNick}`);
    });

    if(unfollow){
        res.redirect(`/u/${friendNick}`);
    }else{
        res.redirect(`/u/${friendNick}`);
    }
});

module.exports = router;
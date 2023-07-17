const express = require('express');
const router = express.Router();
const Auth = require('../../middleware/AuthMiddleware');
const Like = require('./Like');

router.post('/c/like', async(req,res)=>{
    console.log("CHEGOU AQUIIIIIIIIIIIIIII");
    let userId = req.body.userId;
    let conteudoId = req.body.conteudoId;
    console.log({userId,conteudoId});
    if(userId != undefined || userId != ''){

        if (conteudoId != undefined || conteudoId != '') {
            console.log('tudo certo');
            try {
                let like = await Like.create({
                    userId,
                    conteudoId
                });
                res.statusCode = 200;
                res.json({like});
            } catch (error) {
                console.log(error);
                res.statusCode = 400;
            }

        } else {
            res.statusCode = 404;
            res.json({error: 'Conteudo invalido'});
        }
    }else{
        res.statusCode = 404;
        res.json({error: 'usuario invalido'});
    }
    
});


module.exports = router;
const express = require('express');
const router = express.Router();
const Auth = require('../../middleware/AuthMiddleware');
const Like = require('./Like');
const CountLike = require('./CountLike');

router.get('/c/like/:conteudoId', async(req,res)=>{
    console.log('chegamos no conta like');
    let conteudoId = req.params.conteudoId;
    try{
        let likeAmount = await CountLike(conteudoId);
        req.statusCode = 200;
        res.json({likeAmount});
    }catch(err){
        req.statusCode = 404;
        req.json(err);
    }
});

router.post('/c/like', async(req,res)=>{
    let userId = req.body.userId;
    let conteudoId = req.body.conteudoId;
    console.log(req.body);
    console.log("************************* CORRIGIR ERRO *************************");
    console.log("Nao curte no mobile");
    
    if(userId != undefined || userId != ''){

        if (conteudoId != undefined || conteudoId != '') {
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

router.delete('/c/like/:userId/:conteudoId', async(req,res)=>{
    let {userId, conteudoId} = req.params;
    
    console.log(conteudoId + " | " + userId);

    if(userId != undefined || userId != ''){

        if (conteudoId != undefined || conteudoId != '') {

            try {
                let like = await Like.destroy({
                    where:{
                        userId,
                        conteudoId
                    }
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
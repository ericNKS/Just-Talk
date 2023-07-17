const express = require('express');
const router = express.Router();
const Auth = require('../../middleware/AuthMiddleware');
const Like = require('./Like');

router.post('/c/like', async(req,res)=>{
    let userId = req.body.userId;
    let conteudoId = req.body.conteudoId;
    console.log("************************* CORRIGIR ERRO *************************");
    console.log("Nao curte no mobile and todos os liks sao no mesmo id (26)");
    
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

router.delete('/c/like', async(req,res)=>{
    let userId = req.body.userId;
    let conteudoId = req.body.conteudoId;
    console.log(req.body);
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
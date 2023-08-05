const express = require('express');
const router = express.Router();
const Conteudo = require('./Conteudo');
const Auth = require('../middleware/AuthMiddleware');
const GetAllConteudos = require('./GetAllConteudos');

router.post('/c/create', async (req,res)=>{
    let {user, body} = req.body;

    if(body != undefined){
        if (body != '') {
            await Conteudo.create({
                body: body,
                userId: user.id
            }).then((conteudo) => {
                res.statusCode = 200
                res.json(conteudo);
            }).catch((err) => {
                console.log(err);
                res.statusCode = 400
                res.json(err);
                return;
            });
        } else {
            res.statusCode = 400
            res.json({erro: "O campo body nao pode ser vazio"});
        }
    }else{
        res.statusCode = 400
        res.json({erro: "O campo body é invalido"});
    }
});

module.exports = router;
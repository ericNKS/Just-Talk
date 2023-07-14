const express = require('express');
const router = express.Router();
const Conteudo = require('./Conteudo');
const Auth = require('../middleware/AuthMiddleware');
const GetAllConteudos = require('./GetAllConteudos');

router.post('/c/create', Auth, async (req,res)=>{
    let user = req.session.user;
    let body = req.body.conteudo;

    if(body != undefined){
        if (body != '') {
            await Conteudo.create({
                body: body,
                userId: user.id
            }).then((conteudo) => {
                res.redirect('/home');
            }).catch((err) => {
                console.log(err);
                res.redirect('/home');
                return;
            });
        } else {
            res.json({erro: "O campo body nao pode ser vazio"});
        }
    }else{
        res.json({erro: "O campo body é invalido"});
    }
});

router.get('/explorar',Auth, async (req,res)=>{
    console.log('chegou na rotar explorar');
    try {
        let GettedConteudos = await GetAllConteudos();

        res.render('home', {conteudos: GettedConteudos, user: req.session.user, explorar: true});

    } catch (error) {
        console.log(error);
        res.redirect('/home');
        return;
    }

});




module.exports = router;
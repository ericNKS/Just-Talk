const express = require("express");
const router = express.Router();
const Auth = require('../middleware/AuthMiddleware');

router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/home', Auth, (req,res)=>{
    res.send('Bem vindo ao home');
});

module.exports = router;
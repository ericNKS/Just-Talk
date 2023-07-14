const express = require('express');
const router = express.Router();

router.post('like', Auth, async(req,res)=>{
    let userId = req.session.user.id;
    let conteudoId = req.body.conteudoId;
    
    //falta finalizar

});


module.exports = router;
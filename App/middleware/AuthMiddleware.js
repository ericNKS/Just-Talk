const jwt = require('jsonwebtoken');
const secret = "akldjhadbnaldaldasjhoinjsdfjkpdfsklpdsfkjsdfghio";
function Auth(req,res,next) {
    const authToken = req.headers['authorization'];
    if (authToken != undefined) {
        const bearer = authToken.split(' ')
        let token = bearer[1];

        var decode = jwt.verify(token, secret);

        next();
    }else{
        res.statusCode = 403;
        res.json({err: "Você não esta autenticado"});
    }
}


module.exports = Auth;
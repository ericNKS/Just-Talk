function Auth(req,res,next) {
    let user = req.session.user;
    if (user) {
        console.log(user);
        // Se tiver na sessao o usuario ele vai permitir ir para a pagina home
        next();
    }else{
        // Se nao tiver usuario ele vai redirecionar para o index para poder logar ou criar a conta
        res.redirect('/');
    }
}


module.exports = Auth;
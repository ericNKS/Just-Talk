const User = require('../User/User');
const Conteudo = require('./Conteudo');

async function GetAllConteudos()
{

    try {
        
        let getConteudos = await Conteudo.findAll({
            include: [
                {
                    model:User
                }
            ],
            order:[
                ['createdAt', 'DESC']
            ]
        });

        return getConteudos;

    } catch (error) {
        console.log("erroooooooo");
        return error;
    }

}

module.exports = GetAllConteudos;
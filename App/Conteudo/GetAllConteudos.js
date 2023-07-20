const User = require('../User/User');
const Like = require('./Likes/Like');
const Conteudo = require('./Conteudo');

async function GetAllConteudos(id)
{

    if (typeof id != 'undefined') {
        try {
        
            let getConteudos = await Conteudo.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['nick']
                    },
                    Like
                ],
                where: {
                    userId: id
                },
                order:[
                    ['createdAt', 'DESC'],
                ],
            });
    
            return getConteudos;
    
        } catch (error) {
            console.log("erroooooooo");
            return error;
        }

    } else {
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

}

module.exports = GetAllConteudos;
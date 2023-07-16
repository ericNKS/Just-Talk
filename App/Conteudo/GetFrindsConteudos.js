const User = require('../User/User');
const Conteudo = require('./Conteudo');
const GetAmizades = require('../User/Amizade/GetAmizades');

async function GetAllConteudos(id)
{

    try {
        
        let amizades = await GetAmizades(id);
        let arrayteste = [];
// (...)
        await amizades.forEach(async amizade => {
            let userId = amizade.friendId
            let getConteudos = await Conteudo.findAll({
                include: [
                    {
                        model:User
                    }
                ],
                where:{
                    userId
                },
                order:[
                    ['createdAt', 'DESC']
                ]
            }).catch(err=>{
                console.log('erro no GetConteudos');
            });
            arrayteste.push(getConteudos[0]);
        });
        console.log('*********************************************************************************');
        console.log(arrayteste);
        return amizades[0];

    } catch (error) {
        console.log("erroooooooo");
        return error;
    }

}

module.exports = GetAllConteudos;
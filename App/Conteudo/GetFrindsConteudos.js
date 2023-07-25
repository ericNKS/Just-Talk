const User = require('../User/User');
const Conteudo = require('./Conteudo');
const GetAmizades = require('../User/Amizade/GetAmizades');
const GetAllConteudos = require('./GetAllConteudos');
const CountAmizades = require('../User/Amizade/CountAmizades');

async function GetFriendsConteudos(id)
{

    let friendsConteudos = [];
try {

    const amizades = await GetAmizades(id);
    if (amizades.length > 0) {
        for (const amizade of amizades) {
            const friendId = amizade.friendId;
            try {
                let conteudos = await GetAllConteudos(friendId);
                
                friendsConteudos.push(conteudos);
            } catch (err) {
                console.log(err);
            }
        }
        return friendsConteudos[0];
    }else{
        return friendsConteudos;
    }

} catch (error) {
    console.log(error);
    return error;
}


}

module.exports = GetFriendsConteudos;
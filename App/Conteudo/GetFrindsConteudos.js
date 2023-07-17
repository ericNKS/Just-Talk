const User = require('../User/User');
const Conteudo = require('./Conteudo');
const GetAmizades = require('../User/Amizade/GetAmizades');
const GetAllConteudos = require('./GetAllConteudos');

async function GetFriendsConteudos(id)
{

    let friendsConteudos = [];
try {
    const amizades = await GetAmizades(id);
    for (const amizade of amizades) {
        const friendId = amizade.friendId;
        try {
            const conteudos = await GetAllConteudos(friendId);

            friendsConteudos.push(conteudos[0]);
        } catch (err) {
            console.log(err);
        }
    }

    return friendsConteudos;

} catch (error) {
    console.log(error);
    return error;
}


}

module.exports = GetFriendsConteudos;
const Like = require('./Like');

async function CountLike(conteudoId)
{
    let amount = await Like.count({
        where:{
            conteudoId
        }
    });

    return amount;
}

module.exports = CountLike;
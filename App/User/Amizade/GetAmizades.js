const Amizade = require('./Amizade');

async function GetAmizades(userId, friendId){

    if (typeof friendId === "undefined") {
        let amizades = await Amizade.findAll({
            where:{
                userId: userId,
            }
        });
        return amizades;
    } else {
        let amizades = await Amizade.findOne({
            where:{
                userId: userId,
                friendId: friendId
            }
        });
        
        return amizades;
    }
};

module.exports = GetAmizades;
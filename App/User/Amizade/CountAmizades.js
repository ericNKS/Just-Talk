const Amizade = require("./Amizade");

async function countAmizades(id){


    try{
        let following = await Amizade.count({
            where:{
                userId: id
            }
        });

        let followers = await Amizade.count({
            where:{
                friendId: id
            }
        });

        return {following, followers}
    }
    catch(err){
        return err;
    }

}

module.exports = countAmizades;
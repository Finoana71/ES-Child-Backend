const userServ = require("../services/user.service")
const helper = require("../utils/helper");

const inscription = async (req, res) =>{
    try{
        let user = await userServ.inscrire(req);
        res.send(helper.makeDataApi(user));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}


const connexion = async (req, res) =>{
    try{
        let user = await userServ.login(req);
        res.send(helper.makeDataApi(user));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}



module.exports = {
    inscription,
    connexion
}
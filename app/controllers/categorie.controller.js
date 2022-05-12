const catServ = require("./../services/categorie.service")
const helper = require("./../utils/helper");


const getAll = async (req, res) =>{
    try{
        let cats = await catServ.getAll();
        res.send(helper.makeDataApi(cats, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const nouvelle = async (req, res) =>{
    try{
        await catServ.nouveau(req);
        res.send(helper.makeDataApi(null, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

module.exports = {
    getAll,
    nouvelle
}
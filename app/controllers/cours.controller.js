const coursServ = require("./../services/cours.service")
const helper = require("./../utils/helper");


const getAll = async (req, res) =>{
    try{
        let cats = await coursServ.getAllCours(req);
        res.send(helper.makeDataApi(cats, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const nouveau = async (req, res) =>{
    try{
        await coursServ.nouveau(req);
        res.send(helper.makeDataApi(null, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const findOne = async (req, res) =>{
    try{
        let rep = await coursServ.findOne(req);
        res.send(helper.makeDataApi(rep, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}
module.exports = {
    getAll,
    nouveau,
    findOne
}
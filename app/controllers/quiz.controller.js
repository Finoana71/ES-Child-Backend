const quizServ = require("./../services/quiz.service")
const helper = require("./../utils/helper");


const getAll = async (req, res) =>{
    try{
        let cats = await quizServ.getAllQuiz();
        res.send(helper.makeDataApi(cats, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const findOne = async (req, res) =>{
    try{
        let rep = await quizServ.findOne(req);
        res.send(helper.makeDataApi(rep, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}
module.exports = {
    getAll,
    findOne
}
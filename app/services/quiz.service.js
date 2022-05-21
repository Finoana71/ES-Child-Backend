const { ObjectID } = require('mongodb');
const dbo = require('./../../config/db');
const db = dbo.getDb();
const helper = require("./../utils/helper")
const Quiz = db.collection("quiz"); 

// Recuperer un cours
async function findOne(req){
    let idQuiz = req.params.id;
    let quiz = await Quiz.findOne({_id: ObjectID(idQuiz)});
    return quiz;
}


async function getAllQuiz(){
    return await Quiz.find().toArray();
}

module.exports = {
    getAllQuiz,
    findOne,
}
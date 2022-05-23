const { ObjectID } = require('mongodb');
// const { ObjectId, ObjectID } = require('bson');
const dbo = require('./../../config/db');
const db = dbo.getDb();
const Categories = db.collection("categories");
const Cours = db.collection("cours");
const CoursVue = db.collection("coursVue");

async function getAll(){
    let rep = await Categories.find().toArray();
    return rep;
}

function setNbCours(attName, cat, nbCours){
    cat[attName] = 0;
    for(let i = 0; i < nbCours.length; i++){
        if(cat._id == nbCours[i]._id){
            cat[attName] = nbCours[i].nbCours;
        }
    }
}

async function getAllNbVue(idUser){
    let cats = await getAll();
    let nbCours = await getNbCoursCategorie();
    let nbVue = await getNbCoursVue(idUser);
    // console.log(nbVue)
    // console.log(idUser)
    for(let i = 0; i < cats.length; i++){
    //   console.log("*".repeat(100))

        setNbCours("coursTotal", cats[i], nbCours)
        setNbCours("coursVue", cats[i], nbVue)
    }
    return cats;
}

async function getNbCoursCategorie(){
    let rep = await Cours.aggregate([
        {
            $group:
            {
                _id: "$idCategorie",
                nbCours: {$sum: 1 }
            }
        }
    ]).toArray()
    return rep;
}

async function getNbCoursVue(idUser){
    // console.log(idUser)
    let rep = await CoursVue.aggregate([
        {
            $match: {"idUser": idUser } 
        },
        {
            $group:
            {
                _id: "$idCategorie",
                nbCours: {$sum: 1 }
            }
        },
    ]).toArray();
    return rep;
}

function genererCategorie(req){
    let rep = {};
    rep.nom = req.body.nom;
    rep.image = req.body.image;
    return rep;
}


async function getCategorieByNom(nom){
    let cats = await Categories.find({nom: nom}).toArray();
    return cats;
}

function validerRequete(req){
    if(!req.body.nom||!req.body.image)
        throw new Error("Il y a un ou plusieurs champs vides");
}

// Nouveau
async function nouveau(req){
    validerRequete(req);
    let cat = genererCategorie(req);
    let cats = await getCategorieByNom(cat.nom);
    if(cats.length != 0)
        throw new Error("Ce nom est deja utilisé par une catégorie")
    await Categories.insert(cat);
}

module.exports = {
    getAllNbVue,
    nouveau
}



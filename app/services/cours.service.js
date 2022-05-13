const { ObjectID } = require('mongodb');
const dbo = require('./../../config/db');
const db = dbo.getDb();
const helper = require("./../utils/helper")
const Cours = db.collection("cours"); 
    // id, titre, video, image(representative), description(explication) 

// Recuperer un cours
async function findOne(id){
    let cours = await Cours.findOne({_id: ObjectID(id)});
    return cours;
}

// Generer un cours par requete
function genererCours(req){
    let rep = {};
    rep.titre = req.body.titre;
    rep.image = req.body.image;
    rep.video = req.body.video;
    rep.description = req.body.description;
    rep.idCategorie = req.body.idCategorie;
    return rep;
}

// Valider requete ajout
function validerRequete(req){
    let att = ["titre", "image", "video", "description", "idCategorie"];
    helper.validerRequete(req.body)
}

// Verifier Categorie
async function verifierCategorie(id){
    
}


// Nouveau
async function nouveau(req){
    validerRequete(req);
    let course = genererCours(req);
    // let courses = await getCategorieByNom(cat.nom);
    if(courses.length != 0)
        throw new Error("Un cours de meme nom a été déjà créé pour cette catégorie")
    await Categories.insert(cat);
}

module.exports = {
    findOne
}
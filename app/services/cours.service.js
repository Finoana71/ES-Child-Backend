const { ObjectID } = require('mongodb');
const dbo = require('./../../config/db');
const db = dbo.getDb();
const helper = require("./../utils/helper")
const Cours = db.collection("cours"); 
const Categorie = db.collection("categories"); 
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
    helper.validerRequete(req.body, att);
}

// Verifier Categorie
async function verifierCategorie(id){
    let cat = await Categorie.findById(id);
    if(!cat)
        throw new Error("La catégorie n'existe pas");
}

// Get courses by titre
async function getCoursByTitre(titre){
    let c = await Cours.find({titre: titre}).toArray();
    return c;
}

// Nouveau
async function nouveau(req){
    validerRequete(req);
    let course = genererCours(req);
    await verifierCategorie(course.idCategorie);
    let courses = await getCoursByTitre(cat.titre);
    if(courses.length != 0)
        throw new Error("Un cours de meme nom a été déjà créé pour cette catégorie")
    await Cours.insert(course);
}

module.exports = {
    nouveau,
}
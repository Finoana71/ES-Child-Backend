const { ObjectID } = require('mongodb');
const dbo = require('./../../config/db');
const db = dbo.getDb();
const helper = require("./../utils/helper")
const Cours = db.collection("cours"); 
const CoursVue = db.collection("coursVue"); 
const Categorie = db.collection("categories"); 
    // id, titre, video, image(representative), description(explication) 

async function getCoursVue(idUser, idCours){
    let c = await CoursVue.findOne({idUser: idUser, idCours: idCours});
    return c;
}

// Recuperer un cours
async function findOne(req){
    let idCours = req.params.id;
    let cours = await Cours.findOne({_id: ObjectID(idCours)});
    let coursVue = await getCoursVue(req.id, idCours)
    if(!coursVue){
        coursVue = { idCours: idCours, idUser: req.id, idCategorie: cours.idCategorie}    
        await CoursVue.insert(coursVue);
    }
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
    let cat = await Categorie.findOne({_id: ObjectID(id)});
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
    let courses = await getCoursByTitre(course.titre);
    if(courses.length != 0)
        throw new Error("Un cours de meme nom a été déjà créé pour cette catégorie")
    await Cours.insert(course);
}

async function getAllCours(req){
    let idCategorie = req.params.idCategorie;
    let cond = {};
    if(idCategorie)
        cond.idCategorie = idCategorie;
    if(req.query.search)
        cond.titre = new RegExp(req.query.search, 'i')
    return await Cours.find(cond).toArray();
}

module.exports = {
    nouveau,
    findOne,
    getAllCours
}
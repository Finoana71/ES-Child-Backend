const { ObjectId } = require('bson');
const dbo = require('./../../config/db');
const db = dbo.getDb();
const helper = require("./../utils/helper")
const Cours = db.collection("cours"); 
const CoursVue = db.collection("coursVue"); 
const Categorie = db.collection("categories"); 
    // id, titre, video, image(representative), description(explication) 
const notif = require("./notif.service");
async function getOneCoursVue(idUser, idCours){
    let c = await CoursVue.findOne({idUser: idUser, idCours: idCours});
    return c;
}

// Recuperer un cours
async function findOne(req){
    let idCours = req.params.id;
    // console.log(idCours)
    idCours = helper.formaterId(idCours)
    let cours = await Cours.findOne({_id: ObjectId(idCours)});
    if(!cours)
        throw new Error("Le cours est introuvable")
    let coursVue = await getOneCoursVue(req.userId, idCours);
    // console.log(coursVue);
    cours.vue = true;
    if(!coursVue || coursVue.length == 0){
        let cv = { idCours: idCours, idUser: req.userId, idCategorie: cours.idCategorie}    
        await CoursVue.insertOne(cv);
        cours.vue = false;
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
    let att = ["titre", "idCategorie"];
    helper.validerRequete(req.body, att);
}

// Verifier Categorie
async function verifierCategorie(id){
    let cat = await Categorie.findOne({_id: ObjectID(id)});
    if(!cat)
        throw new Error("La catégorie n'existe pas");
}

// Get courses by titre
async function getCoursByTitre(titre, idCategorie){
    let c = await Cours.find({titre: titre, idCategorie: idCategorie}).toArray();
    return c;
}

// Nouveau
async function nouveau(req){
    validerRequete(req);
    let course = genererCours(req);
    await verifierCategorie(course.idCategorie);
    let courses = await getCoursByTitre(course.titre, course.idCategorie);
    if(courses.length != 0)
        throw new Error("Un cours de meme nom a été déjà créé pour cette catégorie")
    await Cours.insert(course);
    notif.envoyerMessage(course);
}

async function getAllCours(req){
    let idCategorie = req.params.idCategorie;
    let cond = {};
    if(idCategorie)
        cond.idCategorie = helper.formaterId(idCategorie);
    if(req.query.search)
        cond.titre = new RegExp(req.query.search, 'i')
        // console.log(cond);
    let cours = await Cours.find(cond).toArray();
    await setCoursVue(req.userId, idCategorie, cours);
    return cours;
}

// https://­es-child-backend.onre­nder.com/api/categories/628776f74d5531361740­bc64/cours

async function getCoursVue(idUser, idCategorie){
    let cond = {idUser: idUser};
    if(idCategorie)
        cond.idCategorie = idCategorie;
    return await CoursVue.find(cond).toArray()
}

async function setCoursVue(idUser, idCategorie, cours){
    let coursVue = await getCoursVue(idUser, idCategorie);
    // console.log(coursVue);
    for(let i = 0; i < cours.length; i++){
        cours[i].vue = false;
        for(let j = 0; j < coursVue.length; j++){
            if(coursVue[j].idCours == cours[i]._id)
                cours[i].vue = true;
        }
    }
}

module.exports = {
    nouveau,
    findOne,
    getAllCours
}
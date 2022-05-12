const dbo = require('./../../config/db');
const db = dbo.getDb();
const Categories = db.collection("categories");

async function getAll(){
    let rep = await Categories.find().toArray();
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
    getAll,
    nouveau
}



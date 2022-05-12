const dbo = require('../../config/db');
const db = dbo.getDb();
const User = db.collection("utilisateurs");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const help = require("./../utils/helper");
const { ObjectId } = require('mongodb');

// Inscription
async function inscrire(req){
    // console.log(req.body)
    validerRequeteInscription(req.body);
    await verifierNumeroUtilise(req.body.numero);
    let user = genererUtilisateur(req);
    await User.insert(user, {fullResult: true}).then();
    return user;
}

// Tester le mot de passe et si l'utilisateur est deja validé
function testLogin(motDePasse, user){
    if(!bcrypt.compareSync(motDePasse, user.motDePasse))
        throw new Error("Le mot de passe est incorrect");
    
}

// Se connecter
async function login(req){
    validerRequeteLogin(req.body);
    let users = await getUtilisateurByNumero(req.body.numero);
    if(users.length == 0)
        throw new Error("Ce numero n'est pas inscrit")
    testLogin(req.body.motDePasse, users[0]);
    var token = jwt.sign({id: users[0]._id}, 'esChild2022');
    users[0].token = token;
    return users[0];
}

// Verifier requete login
function validerRequeteLogin(req){
    // console.log(req);
    if(!req.numero||!req.motDePasse)
        throw new Error("Il y a un ou plusieurs champs vides");
}

function validerRequeteInscription(req){
    // console.log(req);
    if(!req.numero||!req.motDePasse||!req.pseudo)
        throw new Error("Veuillez renseigner tous les champs");
}


function genererUtilisateur(req){
    let user = {};
    user.numero = req.body.numero;
    user.pseudo = req.body.pseudo;
    user.motDePasse = bcrypt.hashSync(req.body.motDePasse, 8);
    return user;
}

async function verifierNumeroUtilise(numero){
    let users = await getUtilisateurByNumero(numero);
    console.log(users);
    if(users.length != 0) throw new Error("Cet numero est deja utilisé par un autre utilisateur")
}

async function getUtilisateurByNumero(numero){
    let users = await User.find({numero: numero}).toArray();
    return users;
}

// Tous les utilisateurs
async function getAllUtilisateurs(req){
    let cond = help.genererConditionSearch(req);
    return help.getCollectionPagine(cond, req, User);
}

async function getById(id){
    let user = await User.findOne({_id: ObjectId(id)});
    return user;
}

module.exports = {
    inscrire,
    login,
    getAllUtilisateurs,
    getById
}
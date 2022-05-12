const fs = require("fs")

function makeDataApi(data, status = 200, message = ''){
    return {data, status, message}
}

function gererErreur(err, res){
    console.log(err);
    res.status(400).send({message: err.message})
}

function getOffset(page, size){
    return (page-1) * size;
}

function getPäge(req){
    let page = req.query.page? req.query.page: 1;
    return page;
}

function getCountPage(size, count){
    return Math.ceil(count/size);
}

function getPaginateData(data, page, count, size){
    let nbPage = getCountPage(size, count);
    return {data, page, count, nbPage};
}

async function getCollectionPagine(cond, req, collection){
    let count = await getCount(cond, collection);
    let size = 10;
    let page = getPäge(req);
    let offset = getOffset(page, size);
    let data = await collection.find(cond).skip(offset).limit(size).toArray();
    return getPaginateData(data, page, count, size); 
}

async function getCount(cond, collection){
    return await collection.count(cond);
}

// Uploader un fichier base64 vers le serveur
function uploadFile(content, path){
    let writeStream = fs.createWriteStream(path);
    let base64result = content.substr(content.indexOf(',') + 1);
    // write some data with a base64 encoding
    writeStream.write(base64result, 'base64');
    writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });
    writeStream.end();
}


function genererConditionSearch(req){
    let cond = {};
    if(req.query.search)
        cond.nom = new RegExp(req.query.search, 'i')
    // console.log(cond)
    return cond;
}

function getConditionDateCommande(req){
    let cond = {};
    if(req.query.dateDebut)
        cond.date = { $gte: ISODate(req.query.dateDebut)}
    if(req.query.dateFin)
        cond.date = { $lte: ISODate(req.query.dateFin)}
    return cond;
}

module.exports = {
    makeDataApi,
    gererErreur,
    getOffset,
    getPaginateData,
    getCollectionPagine,
    uploadFile,
    genererConditionSearch,
    getConditionDateCommande
}
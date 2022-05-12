const jwt = require("jsonwebtoken");
const dbo = require('../../config/db')
const db = dbo.getDb();
const User = db.collection("utilisateurs");
var mongo = require("mongodb")
const ObjectId = mongo.ObjectID;

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(401).send({
            message: "Aucun token",
        });
    }

    const bearer = token.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, "esChild2022", async (err, decoded) => {
        if (!decoded) {
            return res.status(401).send({
                message: "Non autorisé!",
            });
        }
        req.userId = decoded.userId;
        req.currentUser = await User.findOne({_id: ObjectId(decoded.id)});
        if (!req.currentUser||err) {
            return res.status(401).send({
                message: "Non autorisé!",
            });
        }
        next();
    });
};


module.exports = {
    verifyToken,
}
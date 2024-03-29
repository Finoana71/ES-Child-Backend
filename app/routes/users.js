var express = require('express');
var router = express.Router();
const controller = require("../controllers/user.controller")

router.post('/inscription', controller.inscription);
router.post('/connexion', controller.connexion);

module.exports = router;

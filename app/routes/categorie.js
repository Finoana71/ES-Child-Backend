var express = require('express');
var router = express.Router();
const controller = require("../controllers/categorie.controller")
const coursControl = require("../controllers/cours.controller")
const auth = require("../middlewares/auth.middleware");

router.get('/', [auth.verifyToken], controller.getAll);
router.get('/:idCategorie/cours/', [auth.verifyToken], coursControl.getAll);
router.post('/', [auth.verifyToken], controller.nouvelle);

module.exports = router;

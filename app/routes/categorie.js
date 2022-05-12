var express = require('express');
var router = express.Router();
const controller = require("../controllers/categorie.controller")
const auth = require("../middlewares/auth.middleware");

router.get('/', [auth.verifyToken], controller.getAll);
router.post('/', [auth.verifyToken], controller.nouvelle);

module.exports = router;

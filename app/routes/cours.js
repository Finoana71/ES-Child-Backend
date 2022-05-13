var express = require('express');
var router = express.Router();
const controller = require("../controllers/cours.controller")
const auth = require("../middlewares/auth.middleware");

router.get('/', [auth.verifyToken], controller.getAll);
router.post('/', [auth.verifyToken], controller.nouveau);
router.get('/:id', [auth.verifyToken], controller.findOne);

module.exports = router;

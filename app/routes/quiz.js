var express = require('express');
var router = express.Router();
const controller = require("../controllers/quiz.controller")
const auth = require("../middlewares/auth.middleware");

router.get('/', [auth.verifyToken], controller.getAll);
router.get('/:id', [auth.verifyToken], controller.findOne);

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({message: "Welcome to es-child API"})
//   res.render('index', { title: 'Express' });
});

module.exports = router;
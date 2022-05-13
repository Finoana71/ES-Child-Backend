const express = require('express');
const path = require('path');
const app = express();
const dbo = require("./config/db");
var createError = require('http-errors');

// Les fichiers statiques
app.use(express.static(__dirname + '/public/'));

const bodyParser = require("body-parser")
var cookieParser = require('cookie-parser');

// CORS
const cors = require("cors");
var corsOptions = {
  origin: ["*"]
};
app.use(cors(corsOptions));

// Connexion au serveur mongoDb
dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }
    
      // Make sure you place body-parser before your CRUD handlers
      app.use(bodyParser.urlencoded({extended: true}, {limit: '25mb'}))
  
      // Pour que le serveur accepte des datas JSON 
      app.use(bodyParser.json({limit: '25mb'}))
  
      //app.use(logger('dev'));
      app.use(express.json({limit: '25mb'}));
      // parse requests of content-type - application/x-www-form-urlencoded
      app.use(express.urlencoded({ extended: true }, {limit: '25mb'}));
      app.use(cookieParser());
      app.use(express.static(path.join(__dirname, 'public')));
  
      // // view engine setup
      app.set('views', path.join(__dirname, '/views'));
      app.set('view engine', 'jade');
  
  
      // // Ajouter des routeurs
      var indexRouter = require('./app/routes/index');
      var categRouter = require('./app/routes/categorie');
      var userRouter = require('./app/routes/users');
      var coursRouter = require('./app/routes/cours');
  
      // // Utiliser les routeurs api
      app.use('/api/', indexRouter);
      app.use('/api/categories', categRouter);
      app.use('/api/users', userRouter);
      app.use('/api/cours', coursRouter);
  
  
      // catch 404 and forward to error handler
      app.use(function(req, res, next) {
          next(createError(404));
      });
  
      // error handler
      app.use(function(err, req, res, next) {
           //set locals, only providing error in development
          res.locals.message = err.message;
          res.locals.error = req.app.get('env') === 'development' ? err : {};
  
           //render the error page
          res.status(err.status || 500);
         res.send({message: err.message})
      });
  
    // start the Express server
      app.listen(process.env.PORT || 8080);
  });
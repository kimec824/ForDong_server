//load packages
var createError = require('http-errors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

/**for save image
var multer, storage, crypto;
multer = require('multer');
crypto = require('crypto');

var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='file' name='upload'/>" +
"<input type='submit' /></form>" +
"</body></html>";

var fs = require('fs');

storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    return crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) {
        return cb(err);
      }
      return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
    });
  }
});
*/

var cookieParser = require('cookie-parser');
var logger = require('morgan');

//configure app to use bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var PORT = 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//var Book = require('./models/book');
//var router = require('./routes/index')(app, Book);

app.use('/', indexRouter);
app.use('/users', usersRouter);

//connect to mongodb server
var mongoClient = require('mongodb').MongoClient;
var db_name = 'madcamp_project2';
var mydb = null;


/*mongoClient.connect('mongodb://localhost/' + db_name, function(error, client){
  if(error){
    console.log(error);
  }else{
    console.log("connected: " + db_name);
    mydb = client.db(db_name);
    client.close();
    
    var cursor = mydb.collection('contacts').find();
    cursor.each(function(err,doc){
        if(err){
            console.log(err);
        }
        else{
            if(doc != null){
                console.log(doc);
            }
            else{
              console.log("으악");
            }
        }
    });
    //app.set('mydb', mydb);
    
  }
})*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

module.exports = {app, mydb,};
//module.exports = mydb;


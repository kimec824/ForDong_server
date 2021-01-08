//load packages
var createError = require('http-errors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
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
app.use('/', usersRouter);

//connect to mongodb server
var mongoClient = require('mongodb').MongoClient;
var db_name = 'madcamp_project2';
var mydb = null;


mongoClient.connect('mongodb://localhost/' + db_name, function(error, client){
  if(error){
    console.log(error);
  }else{
    console.log("connected: " + db_name);
    mydb = client.db(db_name);
    var jordan = {name:'Jordan', phonenumber:010-2380-1139, position:'President'};
    var amanda = {name:'Amanda', phonenumber:010-1111-1111, position:'Member'};
    var jessica = {name:'Jessica', phonenumber:010-2222-2222, position:'Member'};
    var james = {name:'James', phonenumber:010-3333-3333, position:'Member'};
    var catherine = {name:'Catherine', phonenumber:010-4444-4444, position:'Member'}
    mydb.collection('Contacts').insertMany([jordan,amanda,jessica,james,catherine]);
    client.close();
  }
})

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


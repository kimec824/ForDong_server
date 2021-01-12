//Initialize express router
express = require('express')
router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var db_name = 'madcamp_project2';
var collection_name = 'identification';

var db = null;
var collection;

var multer, storage, crypto;
multer = require('multer');
crypto = require('crypto');
var fs = require('fs');
var path = require('path');

storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb) {
    return crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) {
        return cb(err);
      }
      return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
    });
  }
});

// for use image
var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='file' name='upload'/>" +
"<input type='submit' /></form>" +
"</body></html>";

router.get('/', function(req, res, next) {
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            var id = req.query.ID;
            var password = req.query.Password;

            collection = db.collection(collection_name);
            collection.find({"ID":id, "Password":password}).toArray(function(err, docs){
                if(err){
                    res.send({"Message":"err"});
                }
                if(docs.length > 0){
                    res.send({"Message":"verified"});
                }
                else{
                    res.send({"Message":"fail"});
                }
            });

            /*collection.find({"ID": req.query.ID}).toArray(function(err, results){
                res.status(200).json({'myCollection' : results});
              });*/

            //////////// For DEBUG //////
            var cursor = db.collection(collection_name).find();
            cursor.each(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (doc != null) {
                        console.log(doc);
                    }
                    else {
                        console.log("END");
                    }
                }
            });
            /////////////////////////////

        } 
    });
});

router.get('/signup', function(req, res, next) {
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            var id = req.query.ID;
            var password = req.query.Password;

            collection = db.collection(collection_name);
            collection.find({"ID":id}).toArray(function(err, docs){
                if(err){
                    res.send({"Message":"err"});
                }

                if(docs.length > 0){
                    res.send({"Message":"Already exist"});
                }

                else{
                    if(id.length != 0 && password.length != 0){
                        collection.insert({"ID": id, "Password": password});
                        res.send({"Message":"Sign up"});
                    }
                    else
                        res.send({"Message":"Wrong Type"});
                }
            });

            /*collection.find({"ID": req.query.ID}).toArray(function(err, results){
                res.status(200).json({'myCollection' : results});
              });*/

            //////////// For DEBUG //////
            var cursor = db.collection(collection_name).find();
            cursor.each(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (doc != null) {
                        console.log(doc);
                    }
                    else {
                        console.log("END");
                    }
                }
            });
            /////////////////////////////

        } 
    });
});

router.post('/signup', function(req, res, next) {
    var collection_contacts = 'contacts'        
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_contacts);

            if(Object.keys(req.body).length !== 0)
                collection.insert(req.body);

            res.send({"Message":"Fin"});

            /*collection.find({"ID": req.query.ID}).toArray(function(err, results){
                res.status(200).json({'myCollection' : results});
              });*/

            //////////// For DEBUG //////
            var cursor = db.collection(collection_name).find();
            cursor.each(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (doc != null) {
                        console.log(doc);
                    }
                    else {
                        console.log("END");
                    }
                }
            });
            /////////////////////////////

        } 
    });
});

// Post files
router.post( "/upload", multer({storage: storage}).single('upload'), function(req, res) {
    console.log(req.file);
    console.log(req.body);
    res.redirect("/photos/uploads/" + req.file.filename);
    console.log(req.file.filename);

    mongoClient.connect('mongodb://localhost/', function(error, client){
      if (error) {
          console.log(error);
      } else {
          console.log("connected: " + db_name);
          mydb = client.db(db_name);
          collection = mydb.collection('contacts');
          var ID = req.body.ID;
          var new_photo_path = req.file.filename;
  
        collection.update({"ID":ID},{$set: {"photo":new_photo_path}}, function(err){
            if(err) throw err;
        }
        );
        
      } 
      
  });
  
  return res.status(200).end();
});

router.get('/facebook/signup', function(req, res, next) {
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            var id = req.query.ID;

            collection = db.collection(collection_name);
            collection.find({"ID":id}).toArray(function(err, docs){
                if(err){
                    res.send({"Message":"err"});
                }

                if(docs.length > 0){
                    res.send({"Message":"Already exist"});
                }

                else{
                    if(id.length != 0){
                        collection.insert({"ID": id});
                        res.send({"Message":"Sign up"});
                    }
                    else
                        res.send({"Message":"Wrong Type"});
                }
            });

            /*collection.find({"ID": req.query.ID}).toArray(function(err, results){
                res.status(200).json({'myCollection' : results});
              });*/

            //////////// For DEBUG //////
            var cursor = db.collection(collection_name).find();
            cursor.each(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (doc != null) {
                        console.log(doc);
                    }
                    else {
                        console.log("END");
                    }
                }
            });
            /////////////////////////////

        } 
    });
});

router.post('/facebook/signup', function(req, res, next) {
    var collection_contacts = 'contacts'        
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_contacts);

            if(Object.keys(req.body).length !== 0)
                collection.insert(req.body);

            res.send({"Message":"Fin"});

            /*collection.find({"ID": req.query.ID}).toArray(function(err, results){
                res.status(200).json({'myCollection' : results});
              });*/

            //////////// For DEBUG //////
            var cursor = db.collection(collection_name).find();
            cursor.each(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (doc != null) {
                        console.log(doc);
                    }
                    else {
                        console.log("END");
                    }
                }
            });
            /////////////////////////////
        } 
    });
});
module.exports = router;
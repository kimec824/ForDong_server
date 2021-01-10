//Initialize express router
express = require('express')
router = express.Router();

//for save image
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

var mongoClient = require('mongodb').MongoClient;
var db_name = 'madcamp_project2';

router.get('/', function (req, res){
    //res.writeHead(200, {'Content-Type': 'text/html' });
    //res.end(form);

    collection_name = 'photos'        

    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            mydb = client.db(db_name);

            collection = mydb.collection(collection_name);
            collection.find({}).toArray(function(err, results){
                res.status(200).json({'Photos' : results});
              });

            //////////// For DEBUG //////
            var cursor = mydb.collection(collection_name).find();
            cursor.each(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (doc != null) {
                        console.log(doc);
                    }
                    else {
                        console.log("으악");
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
            collection = mydb.collection(collection_name);
            var new_name = 'sample_name';
            var new_photo_path = req.file.filename;
            var new_context = 'sample_context';
            var new_photo = {
                name : new_name,
                file_path : new_photo_path,
                context : new_context
            }
            collection.insertOne(new_photo, function(err, res){
                if(err) throw err;
                console.log("1 document push");
                client.close();
                
            });
        } 
        
    });
    
    return res.status(200).end();
});

router.get('/uploads/:upload', function (req, res){
    file = req.params.upload;
    console.log("hi");
    console.log(req.params.upload);
    console.log(__dirname);
    var img = fs.readFileSync("./uploads/" + file);
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
  });
  
  module.exports = router;

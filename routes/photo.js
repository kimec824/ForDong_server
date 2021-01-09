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

router.get('/', function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(form);
});

// Post files
router.post( "/upload", multer({storage: storage}).single('upload'), function(req, res) {
      console.log(req.file);
      console.log(req.body);
      res.redirect("/photos/uploads/" + req.file.filename);
      console.log(req.file.filename);
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

//const { db } = require('mongodb');
//const router = require('./users');
//Initialize express router
express = require('express')
router = express.Router();
//  get homepage 


var mongoClient = require('mongodb').MongoClient;
var db_name = 'madcamp_project2';
var mydb = null;
var collection_name = null;
var collection;

router.get('/contacts', function(req, res, next) {

    collection_name = 'contacts'        

    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            mydb = client.db(db_name);

            collection = mydb.collection(collection_name);
            collection.find({}).toArray(function(err, results){
                res.status(200).json({'Contacts' : results});
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

router.post('/contacts', function(req, res, next) {
    collection_name = 'contacts'        

    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            mydb = client.db(db_name);
            collection = mydb.collection(collection_name);

            var new_contact_name = req.body.name;
            var new_contact_phoneNumber = req.body.phoneNumber;
            var new_contact_email = req.body.email;

            var new_contact = {
                name : new_contact_name,
                phoneNumber : new_contact_phoneNumber,
                email : new_contact_email
            }

            collection.insertOne(new_contact, function(err, res){
                if(err) throw err;
                console.log("1 document push");
                client.close();
            });

            res.status(200).json({'input' : 'success'});

        } 
    });
});

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
/**
 * in html
// for use image
var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='file' name='upload'/>" +
"<input type='submit' /></form>" +
"</body></html>";
*/

router.get('/photos', function (req, res){
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
    res.redirect("/uploads/" + req.file.filename);
    console.log(req.file.filename);
    
    collection_name = 'photos'        

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
  

  

/**
router.post('/',function(req,res){
    collection_name = 'contacts'        

    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            mydb = client.db(db_name);

            collection = mydb.collection(collection_name);
            test_collection.find({}).toArray(function(err, results){
                res.status(200).json({'myCollection' : results});
              });

            ////////////// For DEBUG ////////////////////
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
          /////////////////////////////////////////////  
        } 
    });
});
*/
module.exports = router;


// in mongoose

/**
 * 
// 라우터에서 Book 모델을 사용해야 하므로, 라우터에 Book을 전달
module.exports = function(app, Book) 
{
    // GET ALL BOOKS
    // 데이터를 조회 할 때는 find() 메소드가 사용됩니다.
    // query를 파라미터 값으로 전달 할 수 있으며, 파라미터가 없을 시, 모든 데이터를 조회합니다.
    app.get('/api/books', function(req,res){
        Book.find(function(err, books){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(books);
        })
    });




    // GET SINGLE BOOK
    // 하나의 데이터만 찾을 것이기 때문에, findOne 메소드가 사용되었습니다.
    // 오류가 발생하면 500, 데이터가 없으면 404 HTTP Status 와 함께 오류를 출력합니다.
    app.get('/api/books/:book_id', function(req, res){
        Book.findOne({_id: req.params.book_id}, function(err, book){
            if(err) return res.status(500).json({error: err});
            if(!book) return res.status(404).json({error: 'book not found'});
            res.json(book);
        })
    });

    // GET BOOK BY AUTHOR
    // author 값이 매칭되는 데이터를 찾아 출력합니다.
    // find() 메소드에서 첫번째 인자에는 query 를, 두번째는 projection 을 전달해주었습니다.
    // 이를 통하여 author 값으로 찾아서 title 과 published_date 만 출력합니다. 
    // (만약에 projection이 생략되었다면 모든 field 를 출력합니다.)
    app.get('/api/books/author/:author', function(req, res){
        Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, books){
            if(err) return res.status(500).json({error: err});
            if(books.length === 0) return res.status(404).json({error: 'book not found'});
            res.json(books);
        })
    });

    // CREATE BOOK, book 데이터를 데이터베이스에 저장하는 API
    app.post('/api/book', function(req, res){
        var book = new Book();
        book.title = req.body.title;
        // book.title = "test";
        book.author = req.body.author;
        // book.published_date = new Date(req.body.published_date);
        book.published_date = new Date(req.body.published_date);
        console.log(req.body.title)

        book.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
    
            res.json({result: 1});
    
        });
    });

    // UPDATE THE BOOK
    // book_id 를 찾아서 document를 수정합니다.
    // 데이터를 수정 할 땐, 데이터를 먼저 찾은 후, save() 메소드를 통하여 수정하면 됩니다.
    app.put('/api/books/:book_id', function(req, res){
        Book.findById(req.params.book_id, function(err, book){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!book) return res.status(404).json({ error: 'book not found' });
    
            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;
    
            book.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'book updated'});
            });
    
        });
    });

/*
    // UPDATE THE BOOK (ALTERNATIVE)
    // update하는 방법은 이 외에도 다른 방법이 있는데요, 만약 어플리케이션에서 기존 document를 굳이 조회 할 필요가없다면
    // update() 메소드를 통하여 바로 document를 업데이트 할 수 있습니다.
    // 아래 코드는 위의 코드와 같은 동작을 하지만 업데이트하는 과정에서 document를 조회 하지 않습니다.
    // 여기서 output 은 mongod 에서 출력하는 결과물입니다.
    // { 
    //    ok: 1, 
    //    nModified: 0,
    //    n: 1
    //}
    // 여기서 nModified는 변경한 document 갯수, n은 select된 document 갯수입니다.
    // update() 를 실행하였을 떄, 기존 내용이 업데이트 할 내용과 같으면 nModified 는 0 으로 되기 때문에,
    // n 값을 비교하여 성공여부를 판단합니다.

    app.put('/api/books/:book_id', function(req, res){
        Book.update({ _id: req.params.book_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'book not found' });
            res.json( { message: 'book updated' } );
        })
    });


    // DELETE BOOK
    app.delete('/api/books/:book_id', function(req, res){
        // var book_id = req.params.book_id;
        console.log(req.params.book_id);
        if (req.params.book_id === "all")
        {
            // console.log("tt");
            Book.remove({}, function(err, output) {
                if(err) return res.status(500).json({ error: "database failure" });

                res.status(204).end();
                return;
            });

        }

        Book.remove({ _id: req.params.book_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
    
            //( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            //if(!output.result.n) return res.status(404).json({ error: "book not found" });
            //res.json({ message: "book deleted" });
            
    
            res.status(204).end();
        })
    });
 
}
   */


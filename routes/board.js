//Initialize express router
express = require('express')
router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var db_name = 'madcamp_project2';
var collection_name = 'board';

var db = null;
var collection;

router.get('/', function(req, res, next) {
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_name);
            collection.find({}).toArray(function(err, results){
                res.status(200).json({'Board' : results});
              });

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

router.post('/',function(req,res){
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_name);
            /*var new_title=req.body.title;
            var new_content=req.body.content;
            var new_time=req.body.time;
            var new_type=req.body.type;
            var new_writer=req.body.writer;
            var new_post={
                title: new_title,
                content: new_content,
                time: new_time,
                type: new_type,
                writer: new_writer
            }
            collection.insertOne(new_post, function(err, res){
                if(err) throw err;
                console.log("1 document push");
                client.close();
            });

            collection = db.collection(collection_name);
            collection.find({}).toArray(function(err, results){
                res.status(200).json({'myCollection' : results});
              });*/
            
            if(Object.keys(req.body).length !== 0){
                collection.insert(req.body);
                res.status(200).send({"Message":"success"});
            }
            else{
                res.status(200).send({"Message":"fail"});
            }

            ////////////// For DEBUG ////////////////////
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
          /////////////////////////////////////////////  
        } 
    });
});

router.post('/comment',function(req,res){
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_name);

            var title = req.body.title;
            console.log(title);
            var comment = {
                writer : req.body.writer,
                content : req.body.content,
            }

            if(Object.keys(req.body).length !== 0){
                collection.update({"title":title},{$push:{comment: comment.s}},function (err){
                    if(err) throw err;
                    else
                        res.status(200).send({"Message":"success"});
                });
            }
            else{
                res.status(200).send({"Message":"fail"});
            }

            ////////////// For DEBUG ////////////////////
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
          /////////////////////////////////////////////  
        } 
    });
});

router.get('/comment/:title',function(req,res){
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_name);

            collection.find({"title":req.params.title}).toArray(function (err){
                if(err) throw err;
                else
                    res.status(200).send({"Message":"success"});
            });

            ////////////// For DEBUG ////////////////////
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
          /////////////////////////////////////////////  
        } 
    });
});

router.post('/result',function(req,res){
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_name);


            var title = req.body.title;
            var result = {
                ID : req.body.ID,
                code: req.body.code
            }
            
            if(Object.keys(req.body).length !== 0){
                collection.update({"title":title},{$push:{result: result}},function (err){
                    if(err) throw err;
                    else
                        res.status(200).send({"Message":"success"});
                });
            }
            else{
                res.status(200).send({"Message":"fail"});
            }

            ////////////// For DEBUG ////////////////////
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
          /////////////////////////////////////////////  
        } 
    });
});


module.exports = router;
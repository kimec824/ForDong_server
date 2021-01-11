//Initialize express router
express = require('express')
router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var db_name = 'madcamp_project2';
var collection_name = 'vote';

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
                res.status(200).json({'Vote' : results});
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
            var new_title=req.body.title;
            var new_content=req.body.content;
            var new_result = req.body.result;
            var new_comment = req.body.comment;

            var new_vote={
                title: new_title,
                content: new_content,
                result: new_result,
                comment: new_comment
            }

            collection.insertOne(new_vote, function(err, res){
                if(err) throw err;
                console.log("1 document push");
                client.close();
            });

            collection = db.collection(collection_name);
            /*collection.find({}).toArray(function(err, results){
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

router.post('/result/:title',function(req,res){
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_name);

            
            if(Object.keys(req.body).length !== 0){
                collection.update({"title":req.params.title},{$push:{result: req.body}},function (err){
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

router.post('/comment/:title',function(req,res){
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_name);

            
            if(Object.keys(req.body).length !== 0){
                collection.update({"title":req.params.title},{$push:{comment: req.body}},function (err){
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
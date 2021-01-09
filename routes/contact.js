//Initialize express router
express = require('express')
router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var db_name = 'madcamp_project2';
var collection_name = 'contacts';

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
                res.status(200).json({'Contacts' : results});
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

module.exports = router;
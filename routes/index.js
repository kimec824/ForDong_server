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
                res.status(200).json({'myCollection' : results});
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
                        console.log("END");
                    }
                }
            });
            /////////////////////////////

        } 
    });
});

router.post('/contacts',function(req,res){
    collection_name = 'contacts'        

    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            mydb = client.db(db_name);

            collection = mydb.collection(collection_name);
            collection.find({}).toArray(function(err, results){
                res.status(200).json({'myCollection' : results});
              });
            
            //collection.insert({"name":req.body.name, "phone":req.body.phone, "email":req.body.email});
            if(Object.keys(req.body).length !== 0)
                collection.insert(req.body);

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
                        console.log("END");
                    }
                }
            });
          /////////////////////////////////////////////  
        } 
    });
});

module.exports = router;
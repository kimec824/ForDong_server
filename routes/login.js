//Initialize express router
express = require('express')
router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var db_name = 'madcamp_project2';
var collection_name = 'identification';

var db = null;
var collection;

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

router.post('/',function(req,res){
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_name);
            collection.find({}).toArray(function(err, results){
                res.status(200).json({'myCollection' : results});
              });
            
            //collection.insert({"name":req.body.name, "phone":req.body.phone, "email":req.body.email});
            if(Object.keys(req.body).length !== 0)
                collection.insert(req.body);

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

router.post('/signup', function(req, res, next) {
    var collection_contacts = 'contacts'        
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            var id = req.query.ID;
            var password = req.query.Password;

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
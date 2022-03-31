var express = require('express');
var router = express.Router();
var path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Connect to process.env.DATABASE_URL when your app initializes:
// Read only reference value (const)
// get only Client class from mongodb package
const MongoClient = require('mongodb').MongoClient;


//create a client instance connecting to the DATABASE_URL
const client = new MongoClient(process.env.DATABASE_URL,{useUnifiedTopology: true});



//Connect
var db;
client.connect((err, client) => {
  if (err) return console.log(err);
  db = client.db('test'); // whatever the database name is default is 'test'
});   

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});  */


router.get('/books', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public','books.html'));
});

router.get('/booksOut', function(req, res, next) {
  // client object enables issuing SQL queries
  db.collection('book').find().toArray(function(err, result){
    if (err) {next(err);}
    console.log(result.rows);
    res.json(result);
  });
});

module.exports = router;

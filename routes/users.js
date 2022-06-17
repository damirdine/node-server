var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users Page');
});



router.get('/userlist',function(req,res){
  var db = req.db;
  var collection = db.get('userlist');
  collection.find({},{},function(e,docs){
    res.render('userlist',{
      "userlist":docs
    });
  });
});

module.exports = router;
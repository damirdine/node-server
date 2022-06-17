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

router.post('/adduser',function(req,res){
  var db = req.db;
  
  //post value from dthe form 

  var userName = req.body.username;
  var userEmail = req.body.useremail;
  var userFullName = req.body.userfullname;
  var userAge = req.body.userage;
  var userLocation = req.body.userlocation;
  var userGender = req.body.usergender;

  //Set the collection
  var collection = db.get('userlist');

  collection.insert(
    {
      "username" : userName,
      "useremail": userEmail,
      "userfullname":userFullName,
      "userage":userAge,
      "userlocation":userLocation,
      "usergender":userGender
    }, 
    function(err,doc){
      if(err){
        res.send("Problem for adding user to database.")
      }
      res.redirect("userlist");
    }
    

  )

}
)
module.exports = router;
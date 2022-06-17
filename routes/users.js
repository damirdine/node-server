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

  if(actionType=="edit"){
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
  }else{
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
  
});

router.get('/deleteuser/:id', function(req,res){
  var db=req.db;
  var collection =db.get('userlist');
  var userToDelete = req.params.id;
  collection.remove({'id':userToDelete},function(err){
    if(err){
      res.send("Problem for delete in user in the database");
    }
    else{
      res.redirect("users/userlist");
    }
  });
});

router.get('/:id', function(req,res){
  var db =req.db;
  var userToFind = req.params.id;
  var collection = dg.get(userlist);
  collection.findOne({"_id": userTofind},{},function(e,docs){
    res.json(docs);
  })
})

module.exports = router;
var express = require('express');
var router = express.Router();
var User = require("../models/usermodel");
var Challenge = require("../models/challengemodel");
var Response = require("../models/responsemodel");
const uploader = require('../configs/cloudinary-setup');
const multer = require("multer")
const bcrypt = require("bcrypt");

//signup
router.post("/signup", (req,res) => {
  // const {username, password} = request.body
  
  User
  .findOne({"username": req.body.username})
  .then(user => {
    if(user != null) {
      console.log("Charles change the username")
      res.json(user, {
        errorMessage: "This username is already being used! Please use another one."
      })
    } else {
      bcrypt.hash(req.body.password,10,function(err,hash){
        User
        .create({
          username: req.body.username,
          password: hash
        })
        .then(response => {
          res.json(response)
        })
        .catch(error => {
          res.json(error)
        })
      })
    }
  })
  .catch(error => {
    console.log("error has happened", error)
  })
})

//login
router.post("/login", (req,res) => {
  User
  .findOne({"username": req.body.username})
  .then(user => {
    if(!user) {
      res.send("This user does not exist!")
      console.log("Charles the user doesn't exist")
    } else {
      bcrypt.compare(req.body.password, user.password, function(err,result) {
        if(!result) {
          res.send("incorrect credentials")
        } else {
          req.session.currentUser = user
          res.json("Logged in")
          res.redirect("/allchallenges")
        }
      }) 
    }
  })
  .catch(error => {
    res.send("An error happened: ",error)
  })
})

//add challenge
router.post("/startchallenge", (req,res) => {
  Challenge
  .create({
    title: req.body.title,
    description: req.body.description
  })
  .then((response) => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
})

//request challenges
router.get("/allchallenges", (req,res) => {
  Challenge
  .find()
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
})

//request challenge info
// router.get("/challengedetail/:id", (req,res) => {
//   Challenge
//   .findById({_id:req.params.id})
//   .then(response => {
//     console.log("Charles")
//     res.json(response)
//     console.log("Charles")
//   })
//   .catch(error => {
//     res.json(error)
//   })
// })

//upload file challenge
// router.post('/takechallenge', uploader.single("file"), (req, res, next) => {
//   if (!req.file) {
//     next(new Error('No file uploaded!'));
//     return;
//   }
//   res.json({ secure_url: req.file.secure_url });
// })

// router.post('/profile', uploader.single("file"), (req, res, next) => {
//   if (!req.file) {
//     next(new Error('No file uploaded!'));
//     return;
//   }
//   res.json({ secure_url: req.file.secure_url });
// })

module.exports = router;

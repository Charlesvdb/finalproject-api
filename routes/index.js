var express = require('express');
var router = express.Router();
var User = require("../models/usermodel");
var Challenge = require("../models/challengemodel");
var Todo = require("../models/todomodel");
var Response = require("../models/responsemodel");
const bcrypt = require("bcrypt");
// const uploader = require('../configs/cloudinary-setup')
// import { getUser } from '../utils/auth'
// const { getUser } = require('../utils/auth'); 

//signup
router.post("/signup", (req,res) => {
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
          res.json({message: "incorrect credentials"})
        } else {
          req.session.currentUser = user
          res.json("Logged in")
        }
      }) 
    }
  })
  .catch(error => {
    res.json({message: error})
  })
})

//add challenge
router.post("/startchallenge", (req,res) => {
  Challenge
  .create({
    title: req.body.title,
    description: req.body.description,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    satisfaction: req.body.satisfaction
  })
  .then((response) => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
})

// add peopleYouFollow
router.post("/friends", (req,res) => {
  console.log(req.body)
  let iduser = getUser()._id 
  console.log(iduser)
  User
  .findByIdAndUpdate({_id:iduser},{$push:{friends:req.body._id}})
  .then((response) => {
    res.json(response)
    console.log("thisishappening")
  })
  .catch(error => {
    res.json(error)
  })
})

//add to-do
router.post("/todo", (req,res) => {
  console.log(req.body.title)
  Todo
  .create({
    title: req.body.title
  })
  .then((response) => {
    console.log("Charles the post todo is working")
    res.json(response)
  })
  .catch(error => {
    console.log("Charles the post todo is NOT working")
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

//request friends
router.get("/friends", (req,res) =>{
  User
  .find()
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
})

//request todos
router.get("/todo", (req,res) => {
  Todo
  .find()
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
})

//delete challenge
router.delete("/allchallenges/:id", (req,res) => {
  Challenge
  .findByIdAndDelete(req.params.id)
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
})

//delete todo
router.delete("/todo/:id", (req,res)=>{
  Todo
  .findByIdAndDelete(req.params.id)
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
})

// request challenge info
router.get("/challengedetail/:id", (req,res) => {
  Challenge
  .findById({_id:req.params.id})
  .then(response => {
    console.log("Charles")
    res.json(response)
    console.log("Charles")
  })
  .catch(error => {
    res.json(error)
  })
})

//update profile settings
// router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
//   if (!req.file) {
//     next(new Error('No file uploaded!'));
//     return;
//   }
//   res.json({ secure_url: req.file.secure_url });
// })

module.exports = router;

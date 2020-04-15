var express = require('express');
var router = express.Router();
var User = require("../models/usermodel");
var Challenge = require("../models/challengemodel");
var Response = require("../models/responsemodel");
// const uploader = require('../configs/cloudinary-setup');

router.get("/name", (req,res) => {
  res.json({anything: "Charles"})
})

router.post("/signup",(req,res) => {
 User
 .create({
    username: req.body.username,
    password: req.body.password
 })
 .then((response) => {
   res.json(response)
 })
 .catch(error => {
   res.json(error)
 })
})

router.post("/login", (req,res) => {
  User
  .findOne({
    username: req.body.username,
    password: req.body.password
  })
  .then((response) => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
})

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

router.get("/allchallenges", (req,res) => {
  Challenge
  .find({})
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
})

router.get("/challengedetail/:id", (req,res) => {
  Challenge
  .findById({_id:id})
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
})

// router.post('/takechallenge', uploader.single("file"), (req, res, next) => {
//   if (!req.file) {
//     next(new Error('No file uploaded!'));
//     return;
//   }
//   res.json({ secure_url: req.file.secure_url });
// })

module.exports = router;

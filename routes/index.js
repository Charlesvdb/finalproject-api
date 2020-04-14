var express = require('express');
var router = express.Router();
var User = require("../models/usermodel");

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

router.post("/addchallenge", (req,res) => {
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

module.exports = router;

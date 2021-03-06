// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const express = require('express');
const router = express.Router();
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/login", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/members", isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, "../public/members.html"));
});

router.get("/main", function(req,res){
  res.sendFile(path.join(__dirname, "../public/main.html"))
});

router.get("/scorecard", function(req,res){
  res.sendFile(path.join(__dirname, "../public/myTasks.html"))
});

router.get("/mylist", function(req,res){
  res.sendFile(path.join(__dirname, "../public/myTasks.html"))
});

module.exports = router;

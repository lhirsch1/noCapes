const express = require('express');
const router = express.Router();
const db = require("../models");


router.get(`/api/taskList/:id`, function(req,res){
    console.log("taskList get")
    
});

router.post(`/api/taskList`, function(req,res){
    console.log("tasklist post")
})




module.exports = router;
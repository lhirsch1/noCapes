const express = require('express');
const router = express.Router();
const db = require("../models");


router.get(`/api/userTasks`, function(req,res){
    console.log("userTasks get")
});

router.post(`/api/userTasks`, function(req,res){
    console.log("userTasks post")
})




module.exports = router;
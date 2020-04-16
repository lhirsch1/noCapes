const express = require('express');
const router = express.Router();
const db = require("../models");


router.get(`/api/userTasks`, function(req,res){
    console.log("userTasks get")
    db.UserTask.findAll({
        
    }

    )
        .then(results => res.json(results))
        .catch(error => res.json(error))
});

router.get(`/api/userTask/:id`, function(req,res){
    console.log("userTasks get")
    db.UserTask.findOne({
        where: {
            id:req.params.id
        }
    }

    )
        .then(results => res.json(results))
        .catch(error => res.json(error))
});

router.post(`/api/userTasks`, function(req,res){
    console.log("userTasks post")
})




module.exports = router;
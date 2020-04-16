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
    console.log("user task post")
    console.log("req.body ", req.body)
    db.UserTask.create({
        completionStatus: req.body.completionStatus,
        photo: req.body.photo,
        confirmed : req.body.confirmed,
        TaskId: req.body.TaskId,
        UserId: req.body.UserId

    })
    .then((response) => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
});



module.exports = router;
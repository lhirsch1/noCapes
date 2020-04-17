const express = require('express');
const router = express.Router();
const db = require("../models");


router.get(`/api/tasks`, function(req,res){
    console.log("tasks get")
    db.Task.findAll({
        
    }

    )
        .then(results => res.json(results))
        .catch(error => res.json(error))
});

router.get("/api/task/:id", function(req,res){
    console.log("task get one")
    db.Task.findOne({
        where: {
            id : req.params.id
        }
    })
    .then(results => res.json(results))
    .catch(error => res.json(error))
})

router.post(`/api/tasks`, function(req,res){
    console.log("task post")
    console.log("req.body ", req.body)
    db.Task.create({
        CharityId: req.body.CharityId,
        CategoryId: req.body.CategoryId,
        name : req.body.name,
        description: req.body.description,
        points: req.body.points,
        badge: req.body.badge,
        confirmation: req.body.confirmation

    })
    .then((response) => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
});



module.exports = router;
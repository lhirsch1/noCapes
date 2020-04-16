const express = require('express');
const router = express.Router();
const db = require("../models");

//get all tasks
router.get(`/api/tasks/`, function(req,res){
    console.log("task get")
    db.Task.findAll({
        include: [db.Charity] 
        
    })
});

//get one task
router.get(`/api/tasks/:id`, function(req,res){
    console.log("task get")
    db.Task.findAll({
        where: {
            id : req.params.id
        },
        include: [db.Charity]
    })
});


//get tasks by charity
router.get(`/api/tasks/charity/:charId`, function(req,res){
    console.log("task get")
    db.Task.findAll({
        where: {
            '$Charity.id$' : req.params.charId
        },
        include: [ db.Category]
    })
});

router.post(`/api/tasks`, function(req,res){
    
    console.log("taskpost ",req.body)
    db.Task.create(req.body)
    .then((response) => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
})

module.exports = router;
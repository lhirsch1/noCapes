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

//Get mylist/scorecard route
router.get(`/api/userTask/myList/:id/:comp`, function(req,res){
    console.log("userTasks get")
    db.UserTask.findAll({

        where: {
            UserId: req.params.id,
            completionStatus: req.params.comp
        }
        
    //     include: [{model: db.User,
    //     as: 'User',
    // where:{id:req.params.id}}]
    }

    )
        .then(results => res.json(results))
        .catch(error => res.json(error))
});


// router.put(`/api/userTasks/:id`, function(req,res){
//     db.UserTask.update(req.body,
//         {
//             where: {
//                 id: req.body.id
//             }
//         })
// })

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
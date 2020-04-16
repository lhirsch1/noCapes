// const express = require('express');
// const router = express.Router();
// const db = require("../models");

// //get all tasks
// router.get(`/api/tasks/`, function(req,res){
//     console.log("task get")
//     db.Task.findAll({
        
//     })
// });

// //get one task
// router.get(`/api/tasks/:id`, function(req,res){
//     console.log("task get")
//     db.Task.findAll({
//         where: {
//             id : req.params.id
//         }
//         //include: [db.Charity]
//     })
// });


// //get tasks by charity
// router.get(`/api/tasks/charity/:charId`, function(req,res){
//     console.log("task get")
//     db.Task.findAll({
//         where: {
//             '$Task.CharityId$' : req.params.charId
//         },
//         include: [ db.Category],
//         include: [db.Charity]
//     })
// });

// router.post(`/api/tasks`, function(req,res){
    
//     console.log("taskpost ",req.body)
//     db.Task.create(req.body)
//     .then((response) => res.status(200).json(response))
//     .catch(error => res.status(500).json(error))
// })

// module.exports = router;

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




module.exports = router;
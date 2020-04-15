const express = require('express');
const router = express.Router();
const db = require("../models");



router.get(`/api/category`, (req, res) => {
    db.Category.findAll(

    )
        .then(results => res.json(results))
        .catch(error => res.json(error))
})

router.post(`/api/category`, (req, res) => {
    db.Category.create(req.body)
        .then((response) => res.status(200).json(response))
        .catch(error => res.status(500).json(error))
})



module.exports = router;
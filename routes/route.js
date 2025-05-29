const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', (req,res)=>{
    res.render('index', {user: 'Anime tracker', title: "Home"})
})

module.exports = router
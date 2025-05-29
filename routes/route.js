const express = require('express')
const router = express.Router()
const User = require('../models/User')
const axios = require('axios')

router.get('/', (req,res)=>{
    res.render('index', {user: 'Anime tracker', title: "Home"})
})

router.get('/search', async (req, res)=>{
    const query = req.query.q
    let results = []
    if(query) {
        try{
            const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`)
            results = response.data.data
        } catch(error){
            console.error('Error catching anime: ', error)
        }
    }
    res.render('search', {title: 'Search Anime', user: 'Thomas', results, query})
})

module.exports = router
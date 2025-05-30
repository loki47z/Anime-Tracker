const express = require('express')
const router = express.Router()
const User = require('../models/User')
const axios = require('axios')
const session = require('express-session')

//Session Middleware
function isAuth(req, res, next) {
    if(req.session.userID){
        next()
    }
    else{
        req.session.message = 'Please Log in to Access this page'
        res.redirect('/login')
    }
}

//Home Page route
router.get('/', isAuth, (req,res)=>{
    const userDisplayName = req.session.username
    res.render('index', {user: userDisplayName, title: "Home"})
})

//Login
router.get('/login', (req,res)=>{
    const message = req.session.message
    delete req.session.message
    res.render("login", { title: 'Login', message: message})
})

router.post('/login', async(req,res) =>{
    const {username, password}  = req.body
    try{
        const user = await User.findOne({username: username, password: password})
        if(!user){
            req.session.message = 'Invalid username or Password'
            return res.redirect('/login')
        }

        req.session.regenerate(err =>{
            if(err){
                console.error('Session regenration error:', err)
                req.session.message = 'An unexpected error occurred'
                return res.redirect('/login')
            }
            req.session.userID = user._id
            req.session.username = user.username
            res.redirect('/')
        })
    } catch(error){
        console.error('Login Error:', error)
        req.session.message = 'An error occurred during login'
        res.redirect('/login')
    }
})

//Logout
router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err){
            console.error('Error destroying session:', err)
            return res.status(500).send('Could not log out. Please Try again')
        }
        res.redirect('/login')
    })
})

//Register
router.get('/register', (req,res) =>{
    const message = req.session.message
    delete req.session.message
    res.render('register', {title: 'Register', message: message})
})

router.post('/register', async(req,res) =>{
    const {username, password} = req.body
    try{
        const newUser = new User({username, password})
        await newUser.save()
        req.session.message = 'Registration Successful! Please Log in'
        res.redirect('/login')
    } catch(error){
        console.error('Registration error:', error);
        let message = 'Registration failed.';
        if (error.code === 11000) {
            message = 'Username already taken.';
        } else if (error.errors) {
            message = Object.values(error.errors).map(err => err.message).join(', ');
        }
        req.session.message = message;
        res.redirect('/register');
    }
})

//searches
router.get('/search', isAuth, async (req, res)=>{
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
    const userDisplayName = req.session.username || 'Guest'
    res.render('search', {title: 'Search Anime', user: userDisplayName, results, query})
})

router.post('/anime/add',isAuth, async(req,res) =>{
    const {mal_id, title, image_url, status, genres} = req.body
    username = req.session.username
    try{
        let user = await User.findOne({username})
        user.animeList.push({
            mal_id,
            title,
            image_url,
            status,
            genres: genres.split(','),
        })
        await user.save()
        res.redirect('/dashboard')
    } catch(error){
        console.log(error)
        res.status(500).send('Server Error')
    }
})

router.post('/anime/remove', async(req,res) =>{
    const { mal_id } = req.body
    const username = req.session.username
    try{
        const user = await User.findOne({username})
        user.animeList = user.animeList.filter(anime => anime.mal_id != mal_id)
        await user.save()
        res.redirect('/dashboard')
    } catch(error){
        console.error('Error removing anime:', error)
        res.status(500).send('Server Error')
    }
})

router.post('/anime/update-status', isAuth, async (req,res) =>{
    const {mal_id, new_status} = req.body
    const username = req.session.username

    try{
        const user = await User.findOne({username})
        const anime = user.animeList.find(a => a.mal_id == mal_id)
        if(anime){
            anime.status = new_status
            await user.save()
        }
        res.redirect('/dashboard')
    } catch(error){
        console.error('Error updating status:', error)
        res.status(500).send('Server Error')
    }
})

router.get('/dashboard', isAuth, async(req,res) =>{
    try{
        const username = req.session.username
        const user = await User.findOne({ username })
        if(!user) return res.status(404).send('User not found');
        res.render('dashboard', {
            title: 'Dashboard',
            user: user,
            animeList: user.animeList || []
        })
    } catch(error){
        console.error('Dashboard Error:', error)
        res.status(500).send('Server Error')
    }
})

module.exports = router
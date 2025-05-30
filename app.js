require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = require('./routes/route')
const session = require('express-session')

//Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

mongoose.connect(process.env.MONG_URI)
    .then(() =>{
        app.listen(process.env.PORT, () =>{
            console.log("Running on Port ", process.env.PORT)
        })
    })
    .catch(error => console.log(error))

app.use('/', router)
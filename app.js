const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const router = require('./routes/route')

//Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')

mongoose.connect(process.env.MONG_URI)
    .then(() =>{
        app.listen(process.env.PORT, () =>{
            console.log("Running on Port ", process.env.PORT)
        })
    })
    .catch(error => console.log(error))

app.use('/', router)
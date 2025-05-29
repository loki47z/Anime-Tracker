const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
    mal_id: Number,
    title: String,
    image_url: String,
    status: {type: String, enum: ['Watching', 'Completed', 'Plan to Watch']},
    genres: [String]
})

const userSchema = new mongoose.Schema({
    username: {type: String, required:true, unique:true},
    animeSchema: [animeSchema]
})

module.exports = mongoose.model('User', userSchema)
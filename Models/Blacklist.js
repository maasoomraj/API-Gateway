const mongoose = require('mongoose');

 const blacklistSchema = new mongoose.Schema({
    ip : {
        type : String,
        required: true
    },
    date : {
        type : Date,
        default : Date.now
    }
 });

 module.exports = mongoose.model('Blacklist' , blacklistSchema);
const mongoose = require('mongoose');

 const rateLimiterSchema = new mongoose.Schema({
    ip : {
        type : String,
        required: true
    },
    requests : {
        type : Number,
        required: true
    },
    date : {
        type : Date,
        default : Date.now()
    }
 });

 module.exports = mongoose.model('RateLimiter' , rateLimiterSchema);
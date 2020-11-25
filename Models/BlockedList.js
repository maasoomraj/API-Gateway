const mongoose = require('mongoose');

 const blockedListSchema = new mongoose.Schema({
    ip : {
        type : String,
        required: true
    },
    date : {
        type : Date,
        default : Date.now
    }
 });

 module.exports = mongoose.model('BlockedList' , blockedListSchema);
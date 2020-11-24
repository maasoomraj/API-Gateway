const mongoose = require('mongoose');

 const requestSchema = new mongoose.Schema({
    ip : {
        type : String,
        required: true
    },
    requestMethod : {
        type : String,
    },
    requestPath : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
 });

 module.exports = mongoose.model('Request' , requestSchema);
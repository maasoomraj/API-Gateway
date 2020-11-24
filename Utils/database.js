const mongoose = require('mongoose')

dbConnect = () => mongoose.connect(
    'mongodb+srv://masoomraj:MASOOMraj@cluster0.164l1.mongodb.net/Cluster0?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB')
)

module.exports = { dbConnect }
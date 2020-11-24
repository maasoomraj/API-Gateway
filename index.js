const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const fs = require('fs')

var privateKey = fs.readFileSync('./private.key', 'utf-8')
var publicKey = fs.readFileSync('./public.key', 'utf-8')

const { routeDisplayBooks, routeOrderBooks, blacklistIP, saveRequest } = require('./Controllers')

const app = express()
app.use(express.json())

mongoose.connect('mongodb+srv://masoomraj:MASOOMraj@cluster0.164l1.mongodb.net/Cluster0?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
    console.log('Connected to DB');
})

function verifyToken (req, res) {
    var verifyOptions = {
        issuer : '',
        subject : '',
        audience : '',
        algorithm : "RS256"
    }
    jwt.verify(req.headers['auth'], publicKey, verifyOptions, (error, data) => {
        if(error){
            res.sendStatus(500)
        }else{
            req.data = data
        }
    })
}

function register (req, res) {
    user = {
        username: req.body.username,
        password: req.body.password
    }

    var payload = user;
    var signInOptions = {
        issuer : '',
        subject : '',
        audience : '',
        expiresIn : '60s',
        algorithm : "RS256"
    }

    const token = jwt.sign(payload, privateKey, signInOptions)
    res.send({
        token : token
    })
}

app.all('*', (req,res) => {
    saveRequest(req, res)
    if(req.path == '/register' && req.method == 'POST'){
        register(req, res)
    }else if(req.path == '/display-books' && req.method == 'GET'){
        verifyToken(req, res);
        routeDisplayBooks(req, res)
    }else if(req.path == '/orderBooks' && req.method == 'POST'){
        verifyToken(req, res);
        routeOrderBooks(req, res)
    }else if(req.path == '/blacklist' && req.method == 'POST'){
        blacklistIP(req, res)
    }else{
        res.send({
            error: "Failed"
        })
    }
})

const PORT = 8002
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})
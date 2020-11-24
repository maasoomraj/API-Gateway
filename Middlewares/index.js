const router = require('express').Router()
const jwt = require('jsonwebtoken')
const fs = require('fs')
var privateKey = fs.readFileSync('./private.key', 'utf-8')
var publicKey = fs.readFileSync('./public.key', 'utf-8')
const { routeDisplayBooks, routeOrderBooks, blacklistIP, saveRequest } = require('../Controllers')

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

router.all('*', (req,res) => {
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

module.exports = router
const express = require('express')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const mongoose = require('mongoose')
const fs = require('fs')
const requestIP = require('request-ip')
var privateKey = fs.readFileSync('./private.key', 'utf-8')
var publicKey = fs.readFileSync('./public.key', 'utf-8')

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

routeDisplayBooks = async (req, res) => {
    await axios.get('http://localhost:8000/get-books')
    .then((response) => {
        console.log(response.data)
        res.send({response : response.data})
    })
    .catch((error) => {
        res.send({error})
    })
}

routeOrderBooks = async (req, res) => {
    await axios.post('http://localhost:8001/order-book',{
        id: req.body.id,
        name: req.body.name,
        author:  req.body.author,
        username: req.data.username
    })
    .then((response) => {
        console.log(response.data)
        res.send({response : response.data})
    })
    .catch((error) => {
        res.send({error})
    })
}

function verifyToken (req, res) {
    var verifyOptions = {
        issuer : '',
        subject : '',
        audience : '',
        algorithm : "RS256"
    }
    jwt.decode(req.headers['auth'], publicKey, verifyOptions, (error, data) => {
        console.log(data);
    })
    jwt.verify(req.headers['auth'], publicKey, verifyOptions, (error, data) => {
        if(error){
            res.sendStatus(500)
        }else{
            req.data = data
        }
    })
}

app.all('*', (req,res) => {
    const ip = requestIP.getClientIp(req)
    console.log(ip);
    if(req.path == '/register' && req.method == 'POST'){
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

        // const token = jwt.sign(user, "SecretTokenForAPIGatewayByMasoomRaj")
        const token = jwt.sign(payload, privateKey, signInOptions)
        res.send({
            token : token
        })
    }else if(req.path == '/display-books' && req.method == 'GET'){
        verifyToken(req, res);
        routeDisplayBooks(req, res)
        
    }else if(req.path == '/orderBooks' && req.method == 'POST'){
        verifyToken(req, res);
        routeOrderBooks(req, res)
        
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
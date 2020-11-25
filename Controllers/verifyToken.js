const fs = require('fs')
const jwt = require('jsonwebtoken')
var publicKey = fs.readFileSync('./public.key', 'utf-8')

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

module.exports = { verifyToken }
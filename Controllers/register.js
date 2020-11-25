const fs = require('fs')
const jwt = require('jsonwebtoken')
var privateKey = fs.readFileSync('./private.key', 'utf-8')

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

module.exports = { register }
const router = require('express').Router()
const { routeDisplayBooks, routeOrderBooks, blacklistIP, saveRequest } = require('../Controllers')
const { rateLimiter } = require('../Controllers/rateLimiter')
const { verifyToken } = require('../Controllers/verifyToken')
const { register } = require('../Controllers/register')

router.all('*', rateLimiter, (req,res) => {
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
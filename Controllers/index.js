const axios = require('axios')
const Request = require('../Models/Request');
const requestIP = require('request-ip')
const Blacklist = require('../Models/Blacklist');

exports.routeDisplayBooks = async (req, res) => {
    await axios.get('http://localhost:8000/get-books')
    .then((response) => {
        console.log(response.data)
        res.send({response : response.data})
    })
    .catch((error) => {
        res.send({error})
    })
}

exports.routeOrderBooks = async (req, res) => {
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

exports.saveRequest = async (req, res) => {
    const ip = requestIP.getClientIp(req)
    const newRequest = new Request({
        ip : ip,
        requestMethod : req.method,
        requestPath : req.path
    })
    console.log(newRequest);
    await newRequest.save()
}

exports.blacklistIP = async (req, res) => {
    const newBlacklist = new Blacklist({
        ip : req.body.ip
    })
    await newBlacklist.save()
    res.send({
        Blacklist : newBlacklist.ip
    })
}
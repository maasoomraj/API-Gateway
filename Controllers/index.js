const axios = require('axios')
const Request = require('../Models/Request');
const requestIP = require('request-ip')
const BlockedList = require('../Models/BlockedList');

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

exports.blockIP = async (req, res) => {
    const blockUser = new BlockedList({
        ip : req.body.ip
    })
    await blockUser.save()
    res.send({
        Blocked : blockUser.ip
    })
}
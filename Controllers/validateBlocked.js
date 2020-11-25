const requestIP = require('request-ip')
const blockedList = require('../Models/BlockedList');

exports.validateBlocked = async (req, res, next) => {
    const ip = requestIP.getClientIp(req)
    const blockedUser = await blockedList.findOne({ ip : ip })
    if(blockedUser){
        res.sendStatus(500)
        return
    }
    next()
}
const { rateLimit } = require('../Config/index')
const requestIP = require('request-ip')
const RateLimiter = require('../Models/RateLimiter');

exports.rateLimiter = async (req, res, next) => {
    const ip = requestIP.getClientIp(req)
    const userExists = await RateLimiter.findOne({ ip : ip });
    if(userExists){
        console.log(Date.now() - userExists.date)
        if(Date.now() - userExists.date > 60000){
            await userExists.updateOne({ requests : rateLimit-1, date : Date.now() })
        }else{
            if(userExists.requests > 0){
                await userExists.updateOne({ requests : userExists.requests - 1 })
            }else{
                res.sendStatus(500)
                return
            }
        }
    }else{
        const newUser = new RateLimiter({
            ip : ip,
            requests : rateLimit-1
        })
        await newUser.save()
    }
    next()
}
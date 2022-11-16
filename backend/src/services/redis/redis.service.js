const redisClient = require('../../config/init.redis')

const setValue = async (key, value) => {
    const isOk = await redisClient.set(key, JSON.stringify(value), "EX", 7200) // cache for 2 hours
    return isOk
}

const getValue = async (key) => {
    const value = JSON.parse(await redisClient.get(key))
    return value
} 


module.exports = { setValue, getValue };

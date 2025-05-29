const redis = require('../redis/redisClient');

async function getCache(key){
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data);
}


async function setCache(key, value, expiryInSec = 6000){
    await redis.set(key, JSON.stringify(value), expiryInSec);
}

async function delCache(key) {
    await redis.del(key);
}


module.exports = {
    getCache,
    setCache,
    delCache
}
const redis = require('../redis/redisClient');

// GET cache
const getCache = async (key) => {
    try {
      const data = await redis.get(key);
      return data;
    } catch (err) {
      console.error("Redis GET Error:", err);
      return null;
    }
  };
  
  // SET cache with expiration
  const setCache = async (key, value, ttl = 3600) => {
    try {
      await redis.set(key, JSON.stringify(value), 'EX', ttl);
    } catch (err) {
      console.error("Redis SET Error:", err);
    }
  };
  
  // DELETE cache
  const delCache = async (key) => {
    try {
      await redis.del(key);
    } catch (err) {
      console.error("Redis DEL Error:", err);
    }
  };


  // Publisher module in js
  const publisher = async (channel, data) => {
    try {
      await redis.publish(channel, JSON.stringify(data));
    } catch (error) {
      console.error("Redis publish error:", error);
    }
  }
  
  
  module.exports = {
    getCache,
    setCache,
    delCache,
    publisher
  };
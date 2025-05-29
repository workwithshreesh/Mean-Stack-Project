const Redis = require("ioredis");

// Connect to local Redis (Docker)
const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
});

redis.on('connect', () => console.log('Connected to Redis'));
redis.on('error', (err) => console.log('Redis error',err));
const { createClient } = require("ioredis");
const { REDIS_HOST,REDIS_PASSWORD,REDIS_PORT,REDIS_USERNAME } = require("./constant/Env");

const redisClient = createClient({
  host: REDIS_HOST,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  port: REDIS_PORT,
});
redisClient.ping(function (err, result) {
  console.log("Redis client ping result: ", result);
  console.log("Redis client ping errror: ", err);
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (error) => {
  console.log("Redis client connected error: ", error);
});

module.exports = redisClient;

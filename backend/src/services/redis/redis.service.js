const redisClient = require("../../config/init.redis");
const ResponseService = require("../response/response.service");
const Error = require("../../config/constant/Error");

const setValue = async (key, value) => {
  const isOk = await redisClient.set(key, JSON.stringify(value), "EX", 7200); // cache for 2 hours
  if (!isOk) {
    throw ResponseService.newError(
      Error.RedisNotCached.errCode,
      Error.RedisNotCached.errMessage
    );
  }
  return isOk;
};

const getValue = async (key) => {
  const value = JSON.parse(await redisClient.get(key));
  return value;
};

module.exports = { setValue, getValue };

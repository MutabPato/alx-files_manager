import redisClient from './redis';
import dbClient from './db';

/**
 * User utilities module
 */
const userUtils = {
  /**
   * Gets a user id and key from redis
   * @request {request_object} express request obj
   * @return {object} object containing userId andredis key for token
   */
   async getUserIdAndKey(req) {
     const obj = { userId: null, key: null };

     const xToken = req.header('X-Token');

     if (!xToken) return obj;

     obj.key = `auth_${xToken}`;
     obj.userId = await redisClient.get(obj.key);
     return obj;
   },

  /**
   * Gets a user from database
   * @query {object} query expression for finding
   * user
   * @return {object} user document object
   */
  async getUser(query) {
    const user = await dbClient.usersCollection().findOne(query);
    return user;
  },
};

export default userUtils;

import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import userUtils from '../utils/user';

class UsersController {
  // Create a new user
  static async postNew(req, res) {
    try {
    // Get user information from the request body
      const email = req.body ? req.body.email : null;
      const password = req.body ? req.body.password : null;

      // Tuma ma error messages kama ma info hazikukuwa
      if (!email) {
        res.status(400).json({ error: 'Missing email' });
        return;
      }
      if (!password) {
        res.status(400).json({ error: 'Missing password' });
        return;
      }

      // Check if the user already exists
      const user = await (await dbClient.usersCollection()).findOne({ email });
      if (user) {
        res.status(400).json({ error: 'Already exist' });
        return;
      }

      // Create and insert a new user into the database
      const insertionInfo = await (await dbClient.usersCollection())
        .insertOne({ email, password: sha1(password) });

      // Extraction of the user ID
      const userId = insertionInfo.insertedId.toString();

      res.status(201).json({ email, id: userId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getMe(req, res) {
    try {
      const { userId } = await userUtils.getUserIdAndKey(req);

      // Validate ObjectId format
      if (!ObjectId.isValid(userId)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const user = await userUtils.getUser({ _id: ObjectId(userId) });

      if (!user) return res.status(401).send({ error: 'Unauthorized' });

      const processedUser = { id: user._id.toString(), email: user.email };
      return res.status(200).send(processedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default UsersController;

import mongodb from 'mongodb';
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';


// Representation du 'MongoDB client'.
class DBClient {
  // Function ita construire 'DBClient instance' za mupya.
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  // Hii function ita Checker connection ya client
  isAlive() {
    return this.client.isConnected();
  }

  // Return the 'users' collection
  usersCollection() {
    return this.client.db().collection('users');
  }

  // Cette function retourne les nombre de 'user' dans la base de données
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // Retrieves le nombre de fichiers dans la base de données
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

export const dbClient = new DBClient();
export default dbClient;

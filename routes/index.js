import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

/**
 * Function to add routes to the Express app
 * @param {Object} app - The Express app instance
 */
function addRoutes(app) {
  // New router instance
  const router = express.Router();

  // Mounting the touter on the '/' route
  app.use('/', router);

  // Route to check status of Redis and DB
  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  // Route to get stats (users and files)
  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });

  // Route to add a new user
  router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
  }); 

  // Route to
  router.get('/connect', (req, res) => {
    AuthController.getConnect(req, res);
  });

  // Route to
  router.get('/disconnect', (req, res) => {
    AuthController.getDisconnect(req, res);
  });

  // Route to
  router.get('/users/me', (req, res) => {
    UserController.getMe(req, res);
  });
}

export default addRoutes;

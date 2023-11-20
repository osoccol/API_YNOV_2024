const express = require('express');
const router = express.Router(); // router intégré au framework Express
const userController = require('../controllers/user');

const logger = require('../middlewares/logger');
const auth = require('../middlewares/auth');

// Routes CRUD
router.post('/login', [logger], userController.login);
router.post('/loginwithgoogle', [logger], userController.loginwithgoogle);
router.post('/signup', [logger], userController.createUser); // POST = CREATE = CREATION

router.get('/:id', [logger], userController.getUser); // GET = READ = LECTURE

router.put('/:id', [logger, auth], userController.updateUser); // PUT = UPDATE = MODIFICATION
router.delete('/:id', [logger, auth], userController.deleteUser); // DELETE = DELETE = SUPPRESSION

module.exports = router;
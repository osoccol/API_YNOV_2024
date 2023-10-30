const express = require('express');
const router = express.Router(); // router intégré au framework Express
const apiController = require('../controllers/api');
const logger = require('../middlewares/logger');

router.get('/', [logger], apiController.getApiResponse);

module.exports = router;
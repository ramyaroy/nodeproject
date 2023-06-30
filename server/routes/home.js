const express = require('express');
const router = express.Router();
const welcomeController = require('../controllers/welcomeController');

// Routes
router.get('/', welcomeController.view);  
module.exports = router;
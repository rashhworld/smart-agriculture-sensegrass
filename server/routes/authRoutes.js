// Import required modules and middleware
const express = require('express');
const router = express.Router();
const { register, login, getUserCredits } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../middleware/userValidator');
const tokenValidator = require('../middleware/tokenValidator');

// Route for user registration with validation
router.post('/register', registerValidator, register);
// Route for user login with validation
router.post('/login', loginValidator, login);
// Route to get user credits, requires token validation
router.get('/credits', tokenValidator, getUserCredits);

module.exports = router;
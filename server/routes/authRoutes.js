const express = require('express');
const router = express.Router();
const { register, login, getUserCredits } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../middleware/userValidator');
const tokenValidator = require('../middleware/tokenValidator');

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.get('/credits', tokenValidator, getUserCredits);

module.exports = router; 
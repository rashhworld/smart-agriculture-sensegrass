const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../middleware/userValidator');

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);

module.exports = router; 
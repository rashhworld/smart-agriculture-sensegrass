// Import the validation method from express-validator
const { check } = require('express-validator');

// Validator for user registration
exports.registerValidator = [
    // Validate that the full name is at least 2 characters long
    check('fullName').trim().isLength({ min: 2 }).withMessage('Full name must be at least 2 characters long'),
    // Validate that the email is in a proper email format
    check('email').isEmail().withMessage('Please provide a valid email'),
    // Validate that the password is at least 6 characters long
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Validator for user login
exports.loginValidator = [
    // Validate that the email is in a valid format
    check('email').isEmail().withMessage('Please provide a valid email'),
    // Validate that the password is provided
    check('password').exists().withMessage('Password is required')
];
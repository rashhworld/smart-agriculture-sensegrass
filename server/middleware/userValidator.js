const { check } = require('express-validator');

exports.registerValidator = [
    check('fullName')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Full name must be at least 2 characters long'),
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];

exports.loginValidator = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('password')
        .exists()
        .withMessage('Password is required')
]; 
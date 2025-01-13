// Import the validation method from express-validator
const { check } = require('express-validator');

// Field validation middleware
exports.fieldValidator = [
    // Validate that the field name is provided
    check('name').notEmpty().withMessage('Field name is required'),
    // Validate that the latitude is provided
    check('location.latitude').notEmpty().withMessage('Latitude is required'),
    // Validate that the longitude is provided
    check('location.longitude').notEmpty().withMessage('Longitude is required'),
    // Validate that the crop type is provided
    check('cropType').notEmpty().withMessage('Crop type is required'),
    // Validate that the area size is a positive float
    check('areaSize').isFloat({ min: 0 }).withMessage('Valid area size is required')
];
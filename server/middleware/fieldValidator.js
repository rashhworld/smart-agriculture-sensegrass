const { check } = require('express-validator');

exports.fieldValidator = [
    check('name').notEmpty().withMessage('Field name is required'),
    check('location.latitude').notEmpty().withMessage('Latitude is required'),
    check('location.longitude').notEmpty().withMessage('Longitude is required'),
    check('cropType').notEmpty().withMessage('Crop type is required'),
    check('areaSize').isFloat({ min: 0 }).withMessage('Valid area size is required')
];
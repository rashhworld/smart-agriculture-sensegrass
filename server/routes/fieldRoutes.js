// Import required modules and middleware
const express = require('express');
const router = express.Router();
const { fieldValidator } = require('../middleware/fieldValidator');
const { createField, getFields, updateField, deleteField } = require('../controllers/fieldController');

// Route to create a new field with validation
router.post('/', fieldValidator, createField);
// Route to retrieve all fields
router.get('/', getFields);
// Route to update a specific field by ID
router.put('/:id', fieldValidator, updateField);
// Route to delete a specific field by ID
router.delete('/:id', deleteField);

module.exports = router;
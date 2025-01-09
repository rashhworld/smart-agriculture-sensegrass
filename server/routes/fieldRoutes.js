const express = require('express');
const router = express.Router();
const { fieldValidator } = require('../middleware/fieldValidator');
const { createField, getFields, updateField, deleteField } = require('../controllers/fieldController');

router.post('/', fieldValidator, createField);
router.get('/', getFields);
router.put('/:id', fieldValidator, updateField);
router.delete('/:id', deleteField);

module.exports = router; 
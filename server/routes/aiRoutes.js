// Import required modules
const express = require('express');
const router = express.Router();
const { getFieldAnalysis } = require('../controllers/aiController');

// Route to get field analysis by fieldId
router.get('/analysis/:fieldId', getFieldAnalysis);

module.exports = router;
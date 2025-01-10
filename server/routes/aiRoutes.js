const express = require('express');
const router = express.Router();
const { getFieldAnalysis } = require('../controllers/aiController');

router.get('/analysis/:fieldId', getFieldAnalysis);

module.exports = router; 
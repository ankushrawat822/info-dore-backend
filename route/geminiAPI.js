const express = require('express');
const { getGeminiResult } = require('../controller/geminiAPI');

const router = express.Router();

router.post('/ai', getGeminiResult  );

module.exports = router;
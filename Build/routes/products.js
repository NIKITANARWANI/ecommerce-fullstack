const express = require('express');
const router = express.Router();
const mockProducts = require('../utils/mockData').products;

router.get('/', (req, res) => {
  res.json(mockProducts);
});

module.exports = router;

var express = require('express');
var router = express.Router();

// this is actually /example/go
router.get('/go', function (req, res, next) {
  res.end();
})

module.exports = router;

var express = require('express');
var router = express.Router();
var scraper = require('../lib/scraper');
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  var fields = _.pick(req.query, 'address', 'city', 'zip');

  scraper.query(fields, function(err, response) {
    if (err) return res.send(500);
    // to do lookup key from response & send db values

    return res.send(fields);
  });
});

module.exports = router;

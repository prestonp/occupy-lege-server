var express = require('express');
var router = express.Router();
var scraper = require('../lib/scraper');
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  var fields = _.pick(req.query, 'Address1', 'City', 'ZipCode');
  fields.DistrictType = 'ALL';
  fields.Submit1 = 'Submit';
  fields.Address1 = fields.Address1.replace(/\s/g, '+');

  scraper.query(fields, function(err, response) {
    if (err) return res.send(500);
    // to do lookup key from response & send db values
    return res.send(fields);
  });
});

module.exports = router;

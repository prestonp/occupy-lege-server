var _           = require('lodash');
var express     = require('express');
var router      = express.Router();
var scraper     = require('../lib/scraper');
var store       = require('../lib/store');

router.get('/', function(req, res, next) {
  var fields = _.pick(req.query, 'Address1', 'City', 'ZipCode');
  fields.DistrictType = 'ALL';
  fields.Submit1 = 'Submit';
  if (fields.Address1)
    fields.Address1 = fields.Address1.replace(/\s/g, '+');

  scraper.query(fields, function(err, legislators) {
    if (err) return res.send(500);
    return res.send(legislators.map(store.get));
  });
});

module.exports = router;

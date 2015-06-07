var cheerio = require('cheerio');
var request = require('request');
var _ = require('lodash');

var url = 'http://www.fyi.legis.state.tx.us/Address.aspx';

var scraper = {
  query: function(fields, callback) {
    request({
      url: url,
      qs: fields
    }, function(err, response, body) {

      var $ = cheerio.load(body);
      var senators = scraper.getSenators($);
      var reps = scraper.getRepresentatives($);
      var stateReps = scraper.getStateRepresentatives($);

      callback(null, _.flatten(senators.concat(reps).concat(stateReps)) );
    });
  },

  getRepresentatives: function ($) {
    var reps = [];

    var $r = $('#IncumbentDisplayBlock1_Table1 tr').eq(4).text();
    if ($r) {
      reps.push(
        $r
         .split('--')[1]
         .split(/\s/g)
         .slice(1,3)
         .join(' ')
      );
    }
    return reps;
  },

  getSenators: function ($) {
      var senators = [];

      var $s = $('#IncumbentDisplayBlock1_Table1 tr').eq(6).find('a').html();
      if ($s) {

        senators.push(
          $s
            .split(/\s/g)
            .slice(1)
            .join(' ')
        )
      }

      return senators;
  },

  getStateRepresentatives: function ($) {
    var reps = [];

    var index = 8;
    var len = $('#IncumbentDisplayBlock1_Table1 tr').length - 2;
    for(; index < len; index++) {
      var $r = $('#IncumbentDisplayBlock1_Table1 tr').eq(index).find('a').html()
      reps.push(
            $r
            .split(/\s/g)
            .slice(1)
            .join(' ')
      );
    }

    return reps;
  }
};

module.exports = scraper;

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

      var offset = $('.Warning').length ? 1 : 0;
      var senators = scraper.getSenators($, offset);
      var reps = scraper.getRepresentatives($, offset);
      var stateReps = scraper.getStateRepresentatives($, offset);

      callback(null, _.flatten(senators.concat(reps).concat(stateReps)) );
    });
  },

  getRepresentatives: function ($, offset) {
    var reps = [];

    var tr = 4 + offset
    var $r = $('#IncumbentDisplayBlock1_Table1 tr').eq(tr).text();
    if (!!$r) {
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

  getSenators: function ($, offset) {
      var senators = [];

      var tr = 6 + offset;
      var $s = $('#IncumbentDisplayBlock1_Table1 tr').eq(tr).find('a').html();
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

  getStateRepresentatives: function ($, offset) {
    var reps = [];

    var index = 8 + offset;
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

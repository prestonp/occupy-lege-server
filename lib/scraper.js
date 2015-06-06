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

      var senators = scraper.getSenators(body);
      var reps = scraper.getRepresentatives(body);

      callback(null, _.flatten(senators.concat(reps)) );
    });
  },

  getSenators: function (body) {
      var $ = cheerio.load(body);
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

  getRepresentatives: function (body) {
    var $ = cheerio.load(body);
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

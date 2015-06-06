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
      console.log(senators);

      callback(null, {});
    });
  },

  getSenators: function (body) {
      $ = cheerio.load(body);
      var senators = [];

      senators.push($('#IncumbentDisplayBlock1_Table1 tr').eq(6).find('a').html())

      return senators;
  }
};

module.exports = scraper;

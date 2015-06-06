var cheerio = require('cheerio');
var request = require('request');
var url = 'http://www.fyi.legis.state.tx.us/Address.aspx';

var scraper = {
  query: function(fields, callback) {
    request({
      url: url,
      qs: fields
    }, function(err, response, body) {
      $ = cheerio.load(body);
      console.log($.html());
      callback(null, {});
    });
  }
};

module.exports = scraper;

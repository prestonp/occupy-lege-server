var csv = require('csv');
var fs = require('fs');
var _ = require('lodash');

var legislators;

var parseRow = function(row) {
  return {
    name: row[0] + ' ' + row[1],
    firstName: row[0],
    lastName: row[1],
    chamber: row[2],
    capitalPhone: row[3],
    email: row[4],
    districtPhone: row[5]
  };
};

var parser = csv.parse({delimiter: ','}, function(err, data){
  if (err) throw new Exception('Unable to read legislators csv');
  legislators = data.slice(1).map(parseRow);
  console.log('Loaded legislators csv');
});

fs.createReadStream(__dirname + '/../data/Legislator-Contact.csv').pipe(parser);

module.exports = {
  get: function(name) {
    return _.find(legislators, function(legislator) {
      return name.toLowerCase() === legislator.name.toLowerCase();
    });
  }
};

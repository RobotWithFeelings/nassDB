var mongoose = require('mongoose');

var un = "apiuser";
var pw = process.env.MONGO_PW;
var host = "nassdb-0.robot-with-feeling.8169.mongodbdns.com";
var port = 27000;
var db = "nass";

var URI = 'mongodb://' + un + ':' + pw + '@' + host + ':' + port + '/' + db + '?authSource=' + db;

var schema = require('./schema');

module.exports = function(wagner){
	mongoose.connect(URI);

	var Survey = mongoose.model('Survey', schema, 'surveys');
	wagner.factory('Survey', function(){
		return Survey;
	});

	return{
		Survey: Survey
	};
};
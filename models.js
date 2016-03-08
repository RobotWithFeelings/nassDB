var mongoose = require('mongoose');
var URI = 'mongodb://localhost:27017/test'
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
var express = require('express');
var wagner = require('wagner-core');
var Chance = require('chance');
var chance = new Chance();

require('./models')(wagner);

var app = express();

app.get('/', function(request,response){
	response.sendFile(__dirname + '/index.html')
})

app.set('port', (process.env.PORT || 3000));

app.use('/api/v1', require('./api')(wagner, chance));

app.listen(app.get('port'), function() {
	console.log('Listening on port ' + app.get('port'));
});


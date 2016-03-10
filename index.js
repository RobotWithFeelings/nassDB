var express = require('express');
var wagner = require('wagner-core');
var Chance = require('chance');
var stormpath = require('express-stormpath');
var chance = new Chance();

require('./models')(wagner, false);

var app = express();

app.get('/', function(request,response){
	response.sendFile(__dirname + '/index.html')
})

app.set('port', (process.env.PORT || 3000));

app.use('/api/v1', require('./api')(wagner, chance, stormpath));
app.use(stormpath.init(app, { website: true }));


app.on('stormpath.ready', function() {
	app.listen(app.get('port'), function() {
		console.log('Listening on port ' + app.get('port'));
	});
});
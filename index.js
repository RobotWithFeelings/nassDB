var express = require('express');
var wagner = require('wagner-core');
var Chance = require('chance');
var chance = new Chance();

require('./models')(wagner);

var app = express();

app.use('/api/v1', require('./api')(wagner, chance));

app.listen(3000);
console.log('Listening on port 3000!');

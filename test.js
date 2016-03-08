var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL = 'http://localhost:3000'

describe('Survey API', function() {
  var server;
  var Survey;

  before(function(){
    var app = express();
    models = require('./models')(wagner);
    app.use(require('./api')(wagner));
    server = app.listen(3000);
    Survey = models.Survey;
  })

  after(function(){
    server.close();
  })

  beforeEach(function(done) {
    Survey.remove({}, function(err){
      assert.ifError(err);
      done();
    });
  });

  it('can load a survey by name', function(done) {
    s1 = {
      "name": "chutulu",
      "ownMachine": 1,
      "cs" : 0,
      "gender": "f",
      "progExp": 0,
      "age": 100, 
      "q1":5, 
      "q2":8, 
      "q3":4, 
      "q4":9, 
      "q5":1
    }
    Survey.create(s1, function(err,doc){
      assert.ifError(err);
      var url = URL + '/surveys/name/chutulu';
      superagent.get(url, function(err,res){
        assert.ifError(err);
        var result;
        assert.doesNotThrow(function(){
          result = JSON.parse(res.text);
        });
        console.log(result);
        assert.ok(result.survey);
        assert.equal(result.survey.name, 'chutulu');
        done();
      });
    });
  });
});
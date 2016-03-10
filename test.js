var assert = require('assert');
var status = require('http-status');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL = 'http://localhost:3000'

describe('Survey API', function() {
  var server;
  var Survey;

  var chutulu = {
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

  var don = {
    "name": "don jenkins",
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

  var roderick = {
    "name": "roderick",
    "ownMachine": 1,
    "cs" : 0,
    "gender": "f",
    "progExp": 0,
    "age": 100, 
    "q1":5, 
    "q2":1, 
    "q3":4, 
    "q4":9, 
    "q5":1
  }

  var rigoberto = {
    "name": "rigoberto",
    "ownMachine": 1,
    "cs" : 0,
    "gender": "f",
    "progExp": 0,
    "age": 100, 
    "q1":5, 
    "q2":1, 
    "q3":4, 
    "q4":9, 
    "q5":1
  }


  before(function(){
    var app = express();
    models = require('./models')(wagner);
    app.use(require('./api')(wagner));
    server = app.listen(3000);
    Survey = models.Survey;
    Survey.create(chutulu, function(err,doc){
      assert.ifError(err);
    });
    Survey.create(don, function(err,doc){
      assert.ifError(err);
    });
    Survey.create(roderick, function(err,doc){
      assert.ifError(err);
    });
    Survey.create(rigoberto, function(err, doc){
      assert.ifError(err);
    })
  });

  after(function(){
    Survey.remove({}, function(err){
      assert.ifError(err);
      server.close();
    });
  });

  it('can load a survey by name', function(done) {   
    var url = URL + '/surveys/name/chutulu';
    superagent.get(url, function(err,res){
      assert.ifError(err);
      var result;
      assert.doesNotThrow(function(){
        result = JSON.parse(res.text);
      });
      // console.log(result);
      assert.ok(result.survey);
      assert.equal(result.survey.name, 'chutulu');
      done();
    });
  });

  it('can load all of the surveys', function(done){
    var url = URL + '/surveys';
    superagent.get(url, function(err,res){
      assert.ifError(err);
      var result;
      assert.doesNotThrow(function(){
        result = JSON.parse(res.text);
      });
      // console.log(result);
      assert.ok(result.surveys);
      assert.equal(result.surveys[0].name, 'chutulu');
      assert.equal(result.surveys[1].name, 'don jenkins');
      assert.equal(result.surveys[2].name, 'roderick');
      assert.equal(result.surveys[3].name, 'rigoberto');
      done();
    });
  });

  it('can add a survey', function(done){
    var s1 = {
      "name": "reginald",
      "ownMachine": 1,
      "cs" : 0,
      "gender": "f",
      "progExp": 0,
      "age": 100, 
      "q1":5, 
      "q2":1, 
      "q3":4, 
      "q4":9, 
      "q5":1
    }
    url = URL + '/surveys';
    superagent.post(url)
      .send(s1)
      .end(function(err, res){
        assert.ifError(err);
        assert.equal(res.status, status.OK);
        var result;
        assert.doesNotThrow(function(){
          result = JSON.parse(res.text);
        });
      var url = URL + '/surveys/name/reginald';
      superagent.get(url, function(err,res){
        assert.ifError(err);
        var result;
        assert.doesNotThrow(function(){
          result = JSON.parse(res.text);
        });
        // console.log(result);
        assert.ok(result.survey);
        assert.equal(result.survey.name, 'reginald');
      });
      done();
    });
  });

  it('can change a survey by name', function(done){
    var changedQs = {
      "q1":8, 
      "q2":8, 
      "q3":7, 
      "q4":5, 
      "q5":6
    };
    var url = URL + '/surveys/name/roderick';
    superagent
      .put(url)
      .send(changedQs)
      .end(function(err,res){
        assert.ifError(err);
        assert.equal(res.status, status.OK);
        Survey.findOne({"name": "roderick"}, function(err,survey){
          assert.ifError(err);
          for(key in changedQs){
            assert.equal(changedQs[key], survey[key]);
          }
          done();
        });
      });
  });
  
  it('can delete a survey by name', function(done){
    // Delete it and see if it's not there anymore.
    var url = URL + '/surveys/name/rigoberto';
    superagent
      .del(url)
      .end(function(err, res){
        assert.ifError(err);
        assert.ok(res);
        Survey.findOne({"name":"rigoberto"}, function(err, res){
          assert.equal(res, null);
          done();
        });
      });
  });
});



















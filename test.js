var assert = require('assert');
var status = require('http-status');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');
var Chance = require('chance');
var stormpath = require('express-stormpath');
var chance = new Chance();

var URL = 'http://localhost:3000'
var un = process.env.CLIENT_API_KEY;
var pw = process.env.CLIENT_SECRET;

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
    "international": 0,
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
    "international": 0,
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
    "international": 0, 
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
    "international": 0, 
    "q1":5, 
    "q2":1, 
    "q3":4, 
    "q4":9, 
    "q5":1
  }


  before(function(done){
    var app = express();
    models = require('./models')(wagner, true);
    app.use(stormpath.init(app, { website: true }));

    app.use(require('./api')(wagner,chance,stormpath));

    server = app.listen(3000,function(err, res){
      assert.ifError(err);
      // console.log("listening on port 3000");
    });

    app.on('stormpath.ready',function(err, res){
      // console.log("stormpath ready");
      done();
    });    

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
    superagent
      .get(url)
      .auth(un,pw)
      .end(function(err,res){
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
    superagent
      .get(url)
      .auth(un,pw)
      .end(function(err,res){
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
      "international": 1,
      "q1":5, 
      "q2":1, 
      "q3":4, 
      "q4":9, 
      "q5":1
    }
    var url = URL + '/surveys';
    superagent
      .post(url)
      .auth(un,pw)
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

  // it('can change a survey by name', function(done){
  //   var changedQs = {
  //     "q1":8, 
  //     "q2":8, 
  //     "q3":7, 
  //     "q4":5, 
  //     "q5":6
  //   };
  //   var url = URL + '/surveys/name/roderick';
  //   superagent
  //     .put(url)
  //     .auth(un,pw)
  //     .send(changedQs)
  //     .end( function(err,res){
  //       assert.ifError(err);
  //       assert.ifEqual(res.status, status.OK);
  //       Survey.findOne({"name": "roderick"}, function(err, survey){
  //         assert.ifError(err);
  //         for(key in changedQs){
  //           assert.equal(changedQs[key], survey[key]);
  //         }
  //       });
  //     });
  //     done();
  // });

  // it('can delete a survey by name', function(done){
  //   var url = URL + 'surveys/name/rigoberto';
  //   superagent
  //     .del(url)
  //     .auth(un,pw)
  //     .end( function(err,res){
  //       assert.ifError(err);
  //       assert.ifEqual(res.status, status.OK);
  //       Survey.findOne({"name":"rigoberto"}, function(err, deleted){
  //         assert.ifError(err);
  //         assert.equal(deleted,null);
  //       });
  //     });
  //     done();
  // });

  // it('cannot access a route without key', function(done){
  //   var url = URL + '/surveys/name/chutulu';
  //   assert.throws(
  //   superagent
  //     .get(url)
  //     .end(function(err,res){
  //       console.log(err);
  //     }), Error);
  //     done();
  // });

});



















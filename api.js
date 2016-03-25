var express = require('express');
var status = require('http-status');
var bodyparser = require('body-parser');

module.exports = function(wagner,chance,stormpath){
	var api = express.Router();

  // api.use(bodyparser.json());

  api.use(bodyparser.json(), function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //Route to return survey by name
	api.get('/surveys/name/:name', stormpath.apiAuthenticationRequired, wagner.invoke(function(Survey){
    return function(req, res){
			Survey.findOne({ "name": req.params.name }, function(err,survey){
				if(err){
					return res.status(status.INTERNAL_SERVER_ERROR).json({error: err.toString()});
				}
				if(!survey){
					return res.status(status.NOT_FOUND).json({error: "Not Found!!!"});
				}
				res.json({ survey: survey});
			});
		};
	}));

  //Route to return all the surveys
  api.get('/surveys', stormpath.apiAuthenticationRequired, wagner.invoke(function(Survey){
    return function(req, res){
      // console.log(req);
      Survey.find({ }, function(err,surveys){
        if(err){
          return res.status(status.INTERNAL_SERVER_ERROR).json({error: err.toString()});
        }
        if(!surveys){
          return res.status(status.NOT_FOUND).json({error: "Not Found!!!"});
        }
        res.json({surveys: surveys});
      }); 
    };
  }));

  //Route intended to input all answers to survey into already defined survey
  api.put('/surveys/name/:name', stormpath.apiAuthenticationRequired, wagner.invoke(function(Survey){
    return function(req, res){
      // console.log(req.body);
      try { 
        var ans = req.body;
      } catch(err){
        return res.status(status.BAD_REQUEST).json({error: "No answers to change"});
      }
      Survey.findOne({"name": req.params.name}, function(err,survey){
        if(err){
          return res.status(status.INTERNAL_SERVER_ERROR).json({error: err.toString()});
        }
        if(!survey){
          return res.status(status.NOT_FOUND).json({error: "Name not found"});
        }
        for(var key in ans){
          // console.log('key: ' + key);
          // console.log('survey.key ' + survey[key]);
          survey[key] = ans[key];
        }
        // console.log(JSON.stringify(survey));
        survey.save(function(err, survey){
          if(err){
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err.toString() });
          }
          return res.json({ survey: survey});
        })
      });
    };
  }));

  api.post('/surveys', stormpath.apiAuthenticationRequired, wagner.invoke(function(Survey){
    return function(req, res){
      try { 
        var survey = req.body;
      } catch(err){
        return res.status(status.BAD_REQUEST).json({error: "No survey data!"});
      }
     
      if(!survey.hasOwnProperty('name')){
        randName = chance.name();
        console.log(randName);
        survey.name = randName;
      }

      Survey.create(survey, function(err){
        if(err){
          return res.status(status.INTERNAL_SERVER_ERROR).json({error: err.toString()});
        }
        return res.json({survey: survey});
      });
    };
  }));

  api.delete('/surveys/name/:name', stormpath.apiAuthenticationRequired, wagner.invoke(function(Survey){
    return function(req, res){
      Survey.findOne({ "name": req.params.name }, function(err, survey){
        if(err){
          return res.status(status.INTERNAL_SERVER_ERROR).json({error: err.toString()});
        }
        if(!survey){
          return res.status(status.NOT_FOUND).json({error: "Not Found!!!"});
        }
        survey.remove(function(err){
          if(err){
            return res.status(status.INTERNAL_SERVER_ERROR).json({error: err.toString()});
          }
          // console.log('' + res + ' document(s) deleted');
          return res.json({survey:survey});
        });
      });
    };
  }));

	return api;
};
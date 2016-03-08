var express =require('express');
var status= require('http-status');

module.exports = function(wagner){
	var api = express.Router();

  //Route to return survey by name
	api.get('/surveys/name/:name', wagner.invoke(function(Survey){
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
  api.get('/surveys', wagner.invoke(function(Survey){
    return function(req, res){
      Survey.find({ }, function(err,surveys){
        if(err){
          return res.status(status.INTERNAL_SERVER_ERROR).json({error: err.toString()});
        }
        if(!surveys){
          return res.status(status.NOT_FOUND).json({error: "Not Found!!!"});
        }
        res.json( surveys );
      });
    };
  }));

	return api;
};
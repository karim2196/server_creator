'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/env/' + (process.env.NODE_ENV || 'local'));

module.exports = function(app){

	app.use(function(req, res, next) {
		// Website you wish to allow to connect
		var allowedOrigins = ['https://www.shargo.io', 'https://shargo.io', 'http://185.34.193.226' , 'http://142.93.224.80:9011',
		'http://142.93.224.80:9011/home/comercial/clientServices'];

		if (process.env.NODE_ENV == "production") {
			var origin = req.headers.origin;
			if(allowedOrigins.indexOf(origin) > -1){
			   res.setHeader('Access-Control-Allow-Origin', origin);
			}
		}else{
			res.setHeader('Access-Control-Allow-Origin', '*');


		}

		// Request headers you wish to allow

	    // Request headers you wish to allow
	    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Authorization, Origin, x-requested-with, Content-Type, Content-Range, Content-Disposition, Content-Description, x-token, x-userid");
	    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
	    next();

	});


};
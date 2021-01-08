const app = require("../../config/server");

module.exports = function(app){
	app.get('/', function(req, res){
		app.app.controllers.index.index(app, req, res);
	});

	app.post('/autenticar', function(req, res){
		app.app.controllers.index.autenticar(app, req, res);
	});
}
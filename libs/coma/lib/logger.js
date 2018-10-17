var path = require("path");
var log4js = require('log4js');


var config = {	
	appenders: { out: { type: 'stdout' } },
	categories: { default: { appenders: ['out'], level: 'error' } }
};

exports.getLog = function(root,type,level){

	config.appenders[type] = { type: 'file', filename: path.join(root,"logs",type+".log") }
	config.categories[type] = { appenders: [type,"out"], level: level } 

	log4js.configure(config);

	return log4js.getLogger(type);
}

exports.plugin = function(app,opts){
	app.logger = exports.getLog(
		opts.logger_dir || process.cwd(),
		opts.logger_type || "app",
		opts.logger_level || "info"
	);
}
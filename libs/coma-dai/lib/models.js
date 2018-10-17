const mongo= require("mongoose");
const all_models = {};
const uuid=require("./uuid");
mongo.Promise = global.Promise;

exports.connect = function(opts){
	mongo.connect(opts.db_uri,{useNewUrlParser:true},function(err){
		if(err){
			console.dir(err);
		}
	});
}

exports.getModel = function(model_name){
	if(!model_name){		
		return null;
	}

	const M = all_models[model_name];
	if(!M){
		return null;
	}

	return M;
}


exports.regist = function(model_name,properties){
	//console.dir(model_name);
	if(all_models[model_name]){
		return all_models[model_name];
	}

	const props = {
		id : String,
		ctime : Date,
		utime : Date,
		creator : String
	};

	for(const p in properties){
		props[p] = properties[p];
	}

	const model_schema = new mongo.Schema(props);
	const model_ = all_models[model_name]
		= mongo.model(model_name,model_schema,model_name);

	return model_;
};

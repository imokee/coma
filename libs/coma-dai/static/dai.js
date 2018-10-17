/**
 * useage
 * 
 * this.use("dai","demo");
 * 
 * this.demodai = this.dai.create("demo");
 * 
 * this.demodai.add({...});
 * this.demodai.remove({...});
 * 
 */

;(function(){
	var $ = window.jQuery || window.Zepto || window;
	function Dai(model_name,app_name){
		this.model_name = model_name;
		this.app_name = app_name || global_app_name ;
	}

	Dai.prototype = {
		add : function(data,callback){
			$.ajax({
				url : "/"+this.app_name+"/dai/add/"+ this.model_name,
				data : data,
				type : "post",
				success : callback
			});
		},
		query : function(data,callback){
			$.ajax({
				url : "/"+this.app_name+"/dai/query/"+ this.model_name,
				data : data,
				type : "get",
				success : callback
			});
		},
		get : function(query,callback){
			$.ajax({
				url : "/"+this.app_name+"/dai/get/"+this.model_name,
				data:query,
				type : "get",
				success : callback
			});
		},
		update : function(query,data,callback){
			$.ajax({
				url : "/"+this.app_name+"/dai/update/"+this.model_name+"?"+$.param(query),
				type : "post",
				data : data,
				success : callback
			});
		},
		remove : function(data,callback){
			$.ajax({
				url : "/"+this.app_name+"/dai/remove/"+ this.model_name,
				type : "post",
				data : data,
				success : callback
			});
		},
		count : function(data,callback){
			$.ajax({
				url : "/"+this.app_name+"/dai/count/"+ this.model_name,
				type : "get",
				data : data,
				success : callback
			});
		},
		action : function(action,data,callback){
			if(typeof data == "function"){
				callback = data;
				data = {};
			}
			$.ajax({
				url : "/"+this.app_name+"/dai/action/"+ action +"/"+this.model_name,
				type : "post",
				data : data,
				success : callback
			});
		}
	}

	var dai_cache = {};

	H5x.plugin("dai",function(component,opts){
		component.dai = {
			opts : opts||{},
			login : function(app_name,token,callback){
				
			},
			create : function(model_name){
				if(!dai_cache[model_name]){
					dai_cache[model_name] = new Dai(model_name,this.opts.app_name);
				}
				return dai_cache[model_name];
			}
		};
		return component.dai;
	});
})();

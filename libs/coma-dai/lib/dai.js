
const events = require("events");
const uuid=require("./uuid");
const dai_models = require("./models");

function Dai(name,properties){    
    this.name = name;
    this.emitter = {};//new events.EventEmitter();
    this.bind_search(properties);
    this.Model = dai_models.regist(name,properties); 
    this.filter = "-_search";
}

Dai.prototype = {
    /*查询*/
    update_search : async function(query){
        const self = this;
        if(typeof query == "object"){
            const list = await this.Model.find(query);

            if(list && list.length){
                list.forEach((doc)=>{
                    const searchc = [];
                    self.search_keys.forEach((n)=>{
                        searchc.push(doc[n]);
                    });
                    doc._search = searchc.join("|");
                    doc.save(function(err){});
                });
            }
        }
    },

    query_filter : function(filter){
        this.filter = filter;
    },

    bind_search : function(properties){
        const search = properties["_search"];
        
        if(search){
            const self = this;

            this.search_keys = search;
            properties["_search"] = String;

			this.on("added",function(context){
				const id = context.doc.id;
				self.update_search({
                    id:id
                });
			});

			this.on("updated",function(context){
				//const id = context.query;
				self.update_search(context.query);
			});
		}
    },

    query : async function(q){
        const M = this.Model,self = this;

        if(q._search){
            const reg = new RegExp(q._search, 'i')
            q._search = {
                $regex:reg
            }
        }

        const $query = M.find({},this.filter);

        const orders = {};
        
        if(q["_sort"]){
            $query.sort(q["_sort"]);
            delete q["_sort"];
        }
        
        if(q["_ordera"]){

            const c = q["_ordera"].split(",");
            for(var i=0;i<c.length;i++){
                orders[c[i]] = 1;
            }

            delete q["_ordera"];
            $query.sort(orders);
        }
        
        if(q["_orderd"]){

            const c = q["_orderd"].split(",");
            for(var i=0;i<c.length;i++){
                orders[c[i]] = -1;
            }
            
            delete q["_orderd"];
            $query.sort(orders);
        }

        const page = parseInt(q["_page"]) || 0;
        const size = parseInt(q["_size"]) || 10;

        if(page){
            $query.skip(parseInt(page)*size);
        }	
        if(size>=0){
            $query.limit(size);
        }
       

        for(var p in q){
            if(p.indexOf("_") == 0 && p != "_search"){
                delete q[p];
            }
        }


        try {
            const list = await $query.find(q);
            const total = await M.countDocuments(q);

            return {
                code : 1,
                pager:{
                    total:total,
                    page:page,
                    size:size
                },
                list : list
            };
        } catch (error) {

            return {
                code : -5,
                pager:{
                    total:0,
                    page:page,
                    size:size
                },
                messge : "error",
                list : []
            }
        }

    },

    /*获取单个对象*/
    get : async function(q){
        const M = this.Model,self = this;

        try {
            const data = await M.findOne(q);
            return {
                code : 1,
                data : data
            }
        } catch (error) {
            return {
                code : -5,
                messge : "error",
                data : null
            }
        }
    },

    /*删除*/
    remove : async function(q){
        const M = this.Model,self = this;

        if(!q.id){
            return {
                code : -3,
                message : "id is needed"
            }
        }

        const rs = this.emit("remove",{query:q});

        if(rs && rs.error){
            return {
                code:-1,
                message:rs.error
            };
        }

        try {
            await M.remove(q);
            self.emit("removed",{query:q});

            return {
                code : 1,
                message : "删除成功!",
                data : null
            };
        } catch (error) {
            return {
                code : -5,
                messge : "error",
                data : null
            }
        }
    },

    /*添加*/
    add : async function(data){
        const M = this.Model,self = this;

        data.ctime = new Date();
        data.utime = new Date();
        data.id = uuid.createShortId();

        const m = new M(data);

        const rs = await this.emit("add",{
            doc:m
        });  

        //console.log(rs);

        if(rs && rs.error){
            return {
                code:-1,
                message:rs.error
            };
        }

        try {
            await m.save();
            self.emit("added",{
                doc:m
            });

            return {
                code : 1,
                message : "添加成功!",
                data : m.toJSON()
            }
        } catch (error) {
            return {
                code : -5,
                messge : "error",
                data : null
            }
        }
    },

    /*更新*/
    update : async function(query,data){
        const M = this.Model,self=this;
        if(!query.id){
            return {
                code : -3,
                message : "id is needed"
            };
        }

        data.utime = new Date();
        delete data.id;

        const rs = this.emit("update",{
            query:query,
            body:data
        });

        if(rs && rs.error){
            return {
                code:-1,
                message:rs.error
            };
        }   

        try {
            await M.update(query,{$set:data});
            self.emit("updated",{
                query:query,
                body:data
            });

            return {
                code : 1,
                message : "保存成功！",
                data : null
            }

        } catch (error) {
            return {
                code : -5,
                messge : "error",
                data : null
            }
        }
    },

    count : async function(query){
        const M = this.Model,self = this;

        try {
            const count = await M.countDocuments(query)
            return {
                code:1,
                count:count
            }
        } catch (error) {
            console.log(error);
            return {
                code:-1,
                message:"error",
                count:0
            }
        }
  
    },

    /*自定义*/
    action :async function(name,data){
        return await this.emit_action(name,data);
    },

	on : function(action,callback){
		this.emitter[action] = callback;
	},

	emit : async function(action,opts){
        if(typeof this.emitter[action] == "function"){
            return await this.emitter[action](opts);
        }        
	},

	on_action : function(action_name,handler){
		this.emitter["action_"+action_name]=handler;
	},

	emit_action :async function(action_name,data){
        if(typeof this.emitter["action_"+action_name] == "function"){
            return await this.emitter["action_"+action_name](data);
        }        
	}	
}

exports.Dai = Dai;

const path = require("path");

exports.plugin = function(app,server){
    //静态文件
    app.deployer.map_resource("coma-h5x",path.join(__dirname,"static"),[
        "jquery-3.3.1.min.js",
        "jquery-plug.js",
        "template-web.js",
        "page.js",
        "h5x.js",
        "h5x-render.js",
        "h5x-cache.js"
    ]);

    /*
    app.api = {
        emitter : new EventEmitter(), 
        on : function(action_name,callback){
            this.emitter.on(action_name,callback); 
        },
        emit : function(action_name,data){
            this.emitter.emit(action_name,data); 
        }
    }
    */
}
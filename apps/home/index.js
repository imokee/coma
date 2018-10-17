
var path = require("path");
const Router = require('koa-router');

module.exports = function(app){
    app.app_dir = __dirname;
    //app.router  = new Router();
    app.router.prefix("");
    
    app.use("deployer");
    app.use("render");
    app.use("dai");



    //app.set_static("common",path.join(__dirname,"common"));

    const config = require('./webpack.config');
    app.deployer.webpack(config,{
        route_path : "/home/dist/:resource?"
    });

    require("./render/home")(app);

}
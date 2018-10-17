
const Router = require('koa-router');

exports.plugin = function(app){
    app.router  = new Router();
    //console.log('/'+app.app_name);
    app.router.prefix('/'+app.app_name);
};
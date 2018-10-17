
const path = require("path");
const Router = require('koa-router');

module.exports = function(app){
    app.app_dir = __dirname;
    app.router  = new Router();
    
    app.use("dai");
    require("./models")(app);
}
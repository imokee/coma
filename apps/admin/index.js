
var path = require("path");

module.exports = function(app){
    app.app_dir = __dirname;

    app.use("deployer");
    app.use("render");

    const config = require('./webpack.config');
    app.deployer.webpack(config);

    
    app.router.get("/index.html",function(ctx){
        const render = app.render.compile("index.html");
        ctx.body = render({
            _deployer : {}
        });
    })

}
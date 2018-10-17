
const path = require("path");

const Koa = require('koa');
const bodyParser = require("koa-bodyparser");
const mount = require('koa-mount');
const serve = require('koa-static');
const session = require('koa-session');
const Router = require('koa-router');

const App = require("./app").App;
const router = require("./router");
const logger = require("./logger");

const server = new Koa();
 
const CONFIG = {
  key: 'coma:sid',
  maxAge: 86400000
}; 
server.keys = ['coma session key'];
server.use(session(CONFIG, server));

const server_api = {
    set_static(path,root){
        server.use(mount(path, serve(root)));
    },
    findPlugin(name){
        return plugins[name];
    },
};

const plugins = {},
    app_list = [];

module.exports = {
    server : server,
    setting:{
        development : true
    },

    router : new Router(),

    set_static(path,root){
        server.use(mount(path, serve(root)));
    },

    configure(setting){
        
        for(s in setting){
            this.setting[s] = setting[s];
        }

        this.setting.root_dir = path.dirname(require.main.filename);

        logger.plugin(this,{
            logger_dir: this.setting.root_dir,
            logger_type : "server",
            logger_level : this.setting.development ? "debug" : "info"
        });
        
    },

    plugin(name,module){
        plugins[name] = module;
    },

    load(app_name,app_module){
        const app = new App({
            server_api:server_api,
            app_name:app_name
        });

        this.logger.info("loading app ",app_name);

        //使用router插件
        app.use(router);
        app.use(logger,{
            logger_dir:this.setting.root_dir,
            logger_type : app_name,
            logger_level : this.setting.development ? "debug" : "info"
        });
        
        app_module(app)

        app_list.push(app);
    },

    listen(port){
        this.server.use(bodyParser());

        this.server.use(this.router.routes()).use(this.router.allowedMethods());

        app_list.forEach(app => {
            this.server.use(app.router.routes()).use(app.router.allowedMethods());
        });
        this.server.use(function(ctx){
            ctx.status = 404;
            ctx.body = "not found";
        });
        this.server.listen(port);
        this.logger.info("server listening on ",port);
    },

    build(){
        app_list.forEach(app => {
            app.build();
        });
    },

    use(plugin){
        plugin(App.prototype);
    }
}
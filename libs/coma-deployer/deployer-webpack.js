
const webpack = require('webpack')
const koaWebpack  = require('koa-webpack-middleware')
const default_config = require("./webpack.config.defalut")

exports.plugin = function(app){

    app.deployer = {
        webpack(config,opts){
            opts = opts || {};
            const dfconfig = default_config(app.app_dir,app.app_name);            
            Object.assign(dfconfig,config||{});
            const compiler = webpack(dfconfig);            
            const middleware = koaWebpack.devMiddleware(compiler, {
                noInfo: false,
                publicPath: dfconfig.output.publicPath
            });

            app.router.get(opts.route_path || "/dist/:resource?",middleware);

        }

    }
}


function App(opts){
    this.opts = opts;
    this.app_name = opts.app_name;
    this.app_dir = opts.app_dir;
    this.server_api = opts.server_api;
}

App.prototype = {
    set_static(st_path,st_root){
        this.server_api.set_static("/"+this.app_name + "/" + st_path ,st_root);
    },
    
    use(plugin,opts){
        if(typeof plugin == "string"){
            let pname = plugin;
            plugin = this.server_api.findPlugin(plugin);
            if(!plugin){
                console.log("unknown plugin ",pname);
            }
        }

        if(plugin.plugin){
            plugin.plugin(this,opts||{});
        }
        
    }
}

exports.App = App;
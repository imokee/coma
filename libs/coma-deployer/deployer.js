
const path = require("path");
const fs = require("fs");
const template = require('art-template');
const cheerio = require('cheerio');

exports.plugin = function(app){
    const static_map = {};
    const component_map = {};
    let _deployer = {app_name : app.app_name};
    const resource = [];

    app.deployer = {
        map_resource(name,path,files){
            static_map[name] = {
                name:name,
                path:path,
                files:files
            }
            app.set_static(name,path);
        },

        compile(){
            _deployer._scripts = [];
            _deployer._styles = [];
            _deployer._templates = [];

            this.compile_resource();

            for(var c in component_map){
                this.compile_component(c,component_map[c]);
            }
            

            _deployer.scripts = _deployer._scripts.join("");
            _deployer.styles = _deployer._styles.join("");
            _deployer.templates = _deployer._templates.join("");

            return _deployer;

        },

        get_static(){
            return static_map[app.app_name];
        },

        compile_resource(){
            
            for(var m in static_map){
                let files = static_map[m].files || [];
                for(var i=0;i<files.length;i++){
                    let f = files[i]; 
                    if(path.extname(f)==".js"){
                        if(f.indexOf("http") == 0){
                            _deployer._scripts.push(`<script type="text/javascript" src="${f}"></script>`)
                        }else{
                            _deployer._scripts.push(`<script type="text/javascript" src="/${app.app_name}/${m}/${f}"></script>`)
                        }
                        
                    }else if(path.extname(f)==".css"){
                        if(f.indexOf("http") == 0){
                            _deployer._styles.push(`<link  rel="stylesheet" type="text/css" href="${f}"></script>`)
                        }else{
                            _deployer._styles.push(`<link  rel="stylesheet" type="text/css" href="/${app.app_name}/${m}/${f}"></script>`)
                        }
                        
                    }                  
                }
            }

        },

        use_components(name,dir){
            if(!dir){
                dir = name;
                name = _deployer.app_name;
            }

            component_map[name]=dir;

            app.set_static("components",path.join(app.app_dir,"components"));

        },

        compile_component(mname,cdir){
            //components_dir = "components" || this.components_dir;

            function read_dir(com_path){
                let com_dir = path.join(cdir,com_path);

                let files = fs.readdirSync(com_dir);
                files.forEach((filename)=>{
                    const stats = fs.statSync(path.join(com_dir,filename));
                    if(stats.isDirectory()){
                        read_dir(path.join(com_path,filename))
                        return ;
                    }

                    if(com_path){
                        com_path += "/";
                    }

                    let data = fs.readFileSync(path.join(com_dir,filename), 'utf8');
                    if(path.extname(filename)==".js"){
                        _deployer._scripts.push(`<script type="text/javascript" src="/${mname}/components/${com_path}${filename}"></script>`)
                    }else if(path.extname(filename)==".html"){
                        let $ = cheerio.load(data);
                        //console.log($("script").html());

                        $("script").each(function(){
                            var shtml = $("<div></div>").append(this).html();
                            _deployer._templates.push(shtml);
                        });

                        $("style").each(function(){
                            var shtml = $("<div></div>").append(this).html();
                            _deployer._styles.push(shtml);
                        });
                    }
                    
                });
            }

            read_dir("")
            
            
        }
    }
}
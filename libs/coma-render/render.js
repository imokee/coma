const cheerio = require('cheerio');
const path = require("path");
const fs = require("fs");
const template = require('art-template');

exports.plugin = function(app,opts){
    const components = {},renders = {};

    cheerio.prototype.make = cheerio.prototype.make || async function(comname,opts){
        const M = components[comname];
        opts.container = $(this);
        if(!M){
            console.log("no component ",comname);
            return ;
        }

        return await new M(opts);
    }


    app.render = {
        compile(filename){
            if(process.env.NODE_ENV === 'production' && renders[filename]){
                return renders[filename];
            }            

            const settings = {
                debug: process.env.NODE_ENV !== 'production',
                writeResp: true
            };

            if(!app.app_dir){
                console.log("app_dir is ''");
            }

            settings.filename = path.join(app.app_dir||'',filename);

            const render = template.compile(settings);

            renders[filename] = render;

            return render;
        },

        component : function(comname,init,proto){
            const M =async function(opts){
                this.opts = opts;
                await init.apply(this);
            }

            components[comname] = M;

            Object.assign(M.prototype,proto);
        }
    }
}
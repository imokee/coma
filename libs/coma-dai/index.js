
const path=require("path");

const Dai = require("./lib/dai").Dai;
const uuid=require("./lib/uuid");
const dai_models = require("./lib/models");

const all_dai = {};

function plugin(app_module){
    require("./lib/route")(app_module,{
        getDai(name){
            return all_dai[name];
        }
    });

    //静态文件
    /*
    app_module.deployer.map_resource("coma-dai",path.join(__dirname,"static"),[
        "dai.js",
        "dailoader.js"
    ]);
    */

    app_module.dai = {
        build : function(model_name,properties){
            if(!model_name || !properties) return null;
            if(all_dai[model_name]){
                return all_dai[model_name];
            }

            const ndai = all_dai[model_name] = new Dai(model_name,properties);
            return ndai;
        },

        uuid : uuid,

        get : function(model_name){
            return all_dai[model_name] || null;
        }
    }
};

module.exports = function(config){
    dai_models.connect(config);     
    return {plugin:plugin}
}


const path = require("path");
const config = require("./config");
const route = require("./lib/route");

function plugin(app){
    //静态文件
    /*
    app.deployer.map_resource("coma-uploader",path.join(__dirname,"static"),[
        "exif.js",
        "processImg.js",
        "cropper.js",
        "cropper-ext.css",
        "cropper.css",
        "uploader.js"
    ]);
    */
}

module.exports = function(setting,router){    
    config.configure(setting);
    route(router);
    return {
        plugin
    }
}
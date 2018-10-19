const fs = require("fs");
const path = require("path");

if (process.argv[2] == "dev") {
    process.env.NODE_ENV = "development";
}else if (process.argv[2] == "build") {
    process.env.NODE_ENV = "build";
}else{
    process.env.NODE_ENV = "production";
}

module.exports = {    
    server : {
        port: 9006,
    },

    uploader : {
        /**for server store */
        upload_root:path.join(__dirname,"upload"),
        url_base:"/upload/",

        /**for oss store */
        "access_key_id":"",
        "access_key_secret":"",
        "bucket": "",
        "region": "oss-cn-beijing"
    },

    dai : {
        db_uri: "mongodb://your mongodb uri"
    } 
}
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

    /*
    weixin : {
        "weixin_app_id":"wxc0f71e820626c6df",
        "weixin_app_secret":"7c09f07e270e900b37991c65f90ff974",        
        "weixin_api_host":"api.weixin.qq.com", 
        "host_name":"cq.daweilab.com",           

        //for weixin pay
        "mch_id":"1498681802",
        "partner_key": "prwjybe7j98h5shc2fx4a0o6bbycmwyt",
        "apiclient_cert":fs.readFileSync(path.join(__dirname,"files/apiclient_cert.p12")),
        "notify_url":"http://cq.daweilab.com/weixin/pay_notify/",

        default_user:{
            openid: 'oJhYQuBAfVd2OlUg7Pew418m5V8-1',
            nickname: '微信用户1',
            sex: 1,
            language: 'zh_CN',
            city: '济南市',
            province: '山东省',
            country: '中国',
            headimgurl: '/mobile/common/images/default_avatar.jpg',
            privilege: [] 
        }
    },
    */

    uploader : {
        /**for server store */
        upload_root:path.join(__dirname,"upload"),
        url_base:"/upload/",

        /**for oss store */
        "access_key_id":"LTAIGEz85E6hvMAz",
        "access_key_secret":"rUXBTrtuWANCGNpTXBY2uAijpoeLgu",
        "bucket": "cqdawei",
        "region": "oss-cn-beijing"
    },

    dai : {
        db_uri: "mongodb://localhost:27017/cqdawei"
    } 
}
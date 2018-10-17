
const coma = require("./libs/coma");
const config = require("./config");

coma.configure(config.server);

//注册插件
coma.plugin("deployer",require("./libs/coma-deployer"));
coma.plugin("render",require("./libs/coma-render"));
coma.plugin("dai",require("./libs/coma-dai")(config.dai));
coma.plugin("uploader",require("./libs/coma-uploader")(config.uploader,coma.router));

//设置静态目录
coma.set_static("/upload",config.uploader.upload_root);

//加载应用
coma.load("dai",require("./apps/dai"));
coma.load("home",require("./apps/home"));
coma.load("admin",require("./apps/admin"));
coma.load("mobile",require("./apps/mobile"));

//启动服务
coma.listen(config.server.port);
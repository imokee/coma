
const formidable = require('formidable');
const uuid = require('./uuid');
const config = require('../config');
const fs = require("fs");
const path = require("path");
const ossup = require("./oss");

module.exports = function(opts){
    opts = opts || {multiples:true};
    var fields, files;
    return {
        parse : function(ctx){            
            return new Promise(function(resolve, reject){
                var form = new formidable.IncomingForm(opts);
                form.parse(ctx.req, function(err, fields_, files_) { 
                    ///console.log(err);
                    if(err){
                        reject(err);
                    }else{
                        resolve(files);
                        fields = fields_;
                        files = files_;
                    }
                });
            });
        },

        save_file : function(){
            const filelist = [],
                upload_dir = fields["upload_dir"] || "images";

            var count=0;

            //console.log(fields);
            //console.log(upload_dir);

            return new Promise(function(resolve, reject){

                if(!files){
                    return reject("parse request first");
                }

                objForEach(files, function(name, file){ 
                    count++;           
                    save_file(file,upload_dir,function(filedata){
                        filelist.push(filedata);     
                        if(filelist.length == count){
                            resolve(filelist);
                        }
                    });
                });
            });
            
        },

        save_oss : async function(){
            const filelist = [],count=0;
            const upload_dir = fields["upload_dir"] || "images";

            const flist = objToArray(files);

            for(var i=0;i<flist.length;i++){
                let file = flist[i];

                var extname = path.extname(file.name);
                if(!extname){
                    if(file.type.indexOf("jpeg")>0){
                        extname = ".jpg"
                    }else if(file.type.indexOf("png")>0){
                        extname = ".png"
                    }else if(file.type.indexOf("gif")>0){
                        extname = ".gif"
                    }else if(file.type.indexOf("bmp")>0){
                        extname = ".bmp"
                    }
                }
                var fileName = uuid.createShortId()+extname;
                var fpath = upload_dir + "/" + fileName;

                var is = fs.createReadStream(file.path);
                var rs = await ossup.putStream(fpath,is);
                //filesurls.push(rs.url);
                filelist.push({
                    url:rs.url,
                    name:file.name,
                    size:file.size
                }); 
                    
                /*
                if(count == filelist.length){
                    res.json({
                        code: 1,
                        files:filelist,
                        urls: filesurls
                    })
                }
                */
            }

            return filelist;

            /*
            objForEach(files, async function(name, file){ 
                count++;      
                var extname = path.extname(file.name);
                if(!extname){
                    if(file.type.indexOf("jpeg")>0){
                        extname = ".jpg"
                    }else if(file.type.indexOf("png")>0){
                        extname = ".png"
                    }else if(file.type.indexOf("gif")>0){
                        extname = ".gif"
                    }else if(file.type.indexOf("bmp")>0){
                        extname = ".bmp"
                    }
                }
                var fileName = app.dai.uuid.createShortId()+extname;

                var upload_dir = fields["upload_dir"];
                var fpath = upload_dir + "/" + fileName;

                var is = fs.createReadStream(file.path);
                var rs = await ossup.putStream(fpath,is);
                filesurls.push(rs.url);
                filelist.push({
                    url:rs.url,
                    name:file.name
                }); 
                    
                if(count == filelist.length){
                    res.json({
                        code: 1,
                        files:filelist,
                        urls: filesurls
                    })
                }
            });
            */
            
        }
    }

}

function save_file(file,upload_dir,callback){
    var extname = path.extname(file.name);
    if(!extname){
        if(file.type.indexOf("jpeg")>0){
            extname = ".jpg"
        }else if(file.type.indexOf("png")>0){
            extname = ".png"
        }else if(file.type.indexOf("gif")>0){
            extname = ".gif"
        }else if(file.type.indexOf("bmp")>0){
            extname = ".bmp"
        }
    }

    //console.log(extname);

    var fileName = uuid.createShortId()+extname;

    //var upload_dir = fields["upload_dir"] || "default";
    var filepath = path.join(config.setting.upload_root , upload_dir);

    mk_dir(config.setting.upload_root , upload_dir);

    var is = fs.createReadStream(file.path);
    var os = fs.createWriteStream(filepath + "/" + fileName);

    is.pipe(os,function(err){
        console.dir(err);
    });

    var url = config.setting.url_base + upload_dir +"/"+ fileName;

    is.on("end",function(){
        callback({
            name:file.name,
            size:file.size,
            url:url
        });
    });

    is.on("err",function(e){
        console.dir(e);
    });
}

function objForEach(obj, fn) {    
    var key, result;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            var file = obj[key];
            if(file.pop){
                for(var i=0;i<file.length;i++){
                    result = fn.call(obj, key,file[i] )
                    if (result === false) {
                        break;
                    }
                }
            }else{
                result = fn.call(obj, key, file)
                if (result === false) {
                    break;
                }
            }                
        }
    }
}

function objToArray(obj) {
    var key, result;
    const filelist = [];
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            var file = obj[key];
            if(file.pop){
                for(var i=0;i<file.length;i++){
                    filelist.push(file[i]);
                }
            }else{
                filelist.push(file);
            }                
        }
    }

    return filelist
}

var mk_dir = function(root,path){
    if(!path)return;

    path = path.replace(/\\/g,"/");
    var dirs = path.split("/");

    var tpath = root;
    while(tpath && dirs.length >0){
        tpath = tpath + "/" + dirs.shift();
        if(!fs.existsSync(tpath)){
            fs.mkdirSync(tpath);
        }
    }
};
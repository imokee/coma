
const config = require("../config");

/*
var fs = require("fs");
var path = require("path");
var express = require('express');
var formidable = require('formidable');
var ossup = require("./up/oss");
var co = require("co");
*/

module.exports = function(router){

    router.post("/uploader/server",async function(ctx){
        const uploader = require("./uploader")();

        try {
            await uploader.parse(ctx);
            const filelist = await uploader.save_file();

            ctx.body = {
                code : 1,
                files : filelist
            }
        } catch (error) {
            console.log(error);
            ctx.body = {
                code : -1,
                message : "上传失败!" 
            }
        }


        /*
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {            
            var upload_dir = fields["upload_dir"] || "images";
            save_file(files.file,upload_dir,function(url){
                res.end("<html><head><script>"
                    +"parent."+fields["callback"]+"('"+JSON.stringify({
                        code : 1,
                        url : url
                    })+"');"
                    +"</script></head></html>");
            });
        });
        */
    });


    router.post("/uploader/server-doc",async function(ctx){

        const uploader = require("./uploader")(ctx.request);

        try {
            await uploader.parse();
            const filelist = await uploader.save_file();

            const urls = [];
            filelist.forEach(function(f){
                urls.push(f.url);
            });

            ctx.body = {
                errno: 0,
                data: urls
            }
        } catch (error) {
            ctx.body = {
                errno : 1,
                message : "上传失败!" 
            }
        }

        /*
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            var filesurls = [],count=0;
            objForEach(files, function(name, file){ 
                count++;           
                save_file(file,"article-img",function(url){
                    filesurls.push(url);     
                    if(filesurls.length == count){
                        res.json({
                            errno: 0,
                            data: filesurls
                        });
                    }
                });
            });
        });
        */
    });

    router.post("/uploader/oss",async function(ctx){

        const uploader = require("./uploader")();

        try {
            await uploader.parse(ctx);
            const filelist = await uploader.save_oss();

            ctx.body = {
                code : 1,
                files : filelist
            }
        } catch (error) {
            //console.log(error);
            ctx.body = {
                code : -1,
                message : "上传失败!" 
            }
        }
        /*
        var form = new formidable.IncomingForm({
            multiples: true
        });

        var count = 0;
        form.parse(req, function(err, fields, files) {
            var filesurls = [],count=0;
            var filelist = [];  

            //console.log(files.length);
            objForEach(files, function(name, file){
                co(function*(){                
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
                    var rs = yield ossup.putStream(fpath,is);
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
            });            
        });
        */
    });

    router.post("/uploader/oss-doc",async function(ctx){
        const uploader = require("./uploader")();

        try {
            await uploader.parse(ctx);
            const filelist = await uploader.save_oss();

            const urls = [];
            filelist.forEach(function(f){
                urls.push(f.url);
            });

            ctx.body = {
                errno: 0,
                data: urls
            }
        } catch (error) {
            //console.log(error);
            ctx.body = {
                code : -1,
                message : "上传失败!" 
            }
        }
    });

}

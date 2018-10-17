
var oss = require('ali-oss');
//var path = require("path");
var co = require('co');
var fs = require("fs");
var config = require("../config");

var store = oss({
    accessKeyId: config.setting.access_key_id,
    accessKeySecret: config.setting.access_key_secret,
    bucket: config.setting.bucket,
    region: config.setting.region,
    timeout:"180s"
});


exports.put = async function(fpath,filepath){
    try {
        return await store.putStream(fpath, fs.createReadStream(filepath));
        //console.log(object);
    } catch (error) {
        console.log(error);
    }

    return {};
}

exports.putStream = async function(fpath,fileStream){
    try {
        return await store.putStream(fpath,fileStream);
        //console.log(object);
    } catch (error) {
        console.log(error);
    }

    return {};
}

exports.putProgress = async function(fpath,filepath,onprogress){
    try {
        return await store.multipartUpload(fpath, filepath,{
            progress: async function(p, cpt) {
                onprogress(p, cpt);
            }
        });
        //console.log(object);
    } catch (error) {
        console.log(error);
    }

    return {};
}

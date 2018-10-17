module.exports = function(app) {
    const ArticleDai = app.dai.build("article", {        
        title:String,
        cover:String,
        type:String,
        keywords:String,
        authorid:String,
        authorname:String,
        content:String,
        text:String, 
        _search:["title","authorid","authorname","keywords"]
    });
}
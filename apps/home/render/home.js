
const utils = require("../utils");
module.exports = function(app){

    const articledai = app.dai.get("article");

    app.router.get(["/","/index.html","/index-:page.html"],async function(ctx){        
        const render = app.render.compile("pages/home.html");
        if(!ctx.params.page){
            ctx.params.page = 0;
        }
        const rs = await articledai.query({_orderd:"ctime",_page:ctx.params.page});
        const totalpage = Math.ceil(rs.pager.total/rs.pager.size);

        ctx.body = render({
            page_name : "index",
            prefix : "",
            title : "首页",
            pager : rs.pager,
            pagerange : utils.range(totalpage),
            list : rs.list || []
        });
    });

    const sub_page = {
        news : "资讯",
        platform : "平台",
        case : "案例",
        tech : "技术",
        other : "其他"
    }

    app.router.get(["/home/:pagename-:page.html","/home/:pagename.html"],async function(ctx){
        const page_name = ctx.params.pagename;
        const render = app.render.compile("pages/home.html");
        const rs = await articledai.query({_orderd:"ctime",_page:ctx.params.page,type:sub_page[page_name]});
        
        const totalpage = Math.ceil(rs.pager.total/rs.pager.size);

        ctx.body = render({
            page_name : page_name,
            prefix : "/home",
            title : sub_page[page_name],
            pager : rs.pager,
            pagerange : utils.range(totalpage),
            list : rs.list || []
        });
    })
}

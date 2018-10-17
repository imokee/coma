
module.exports = function(app,dai){
	//查询
	app.router.get("/dai/query/:model_name",async function(ctx){
        const model_name = ctx.params["model_name"];
        const MDai = dai.getDai(model_name);
        if(!MDai){
            ctx.body = {code:-4,message:"model not found "+model_name};
            return ;
        }

        try {
            ctx.body = await MDai.query(ctx.query);
        } catch (error) {
            app.logger.error(error);
            ctx.body = {code:-5,message:"error"};
        }
        
    });

	//查询单个
	app.router.get("/dai/get/:model_name",async function(ctx){
        const model_name = ctx.params["model_name"];
        const MDai = dai.getDai(model_name);
        if(!MDai){
            ctx.body = {code:-4,message:"model not found "+model_name};
            return ;
        }

        try {
            ctx.body = await MDai.get(ctx.query);
        } catch (error) {
            app.logger.error(error);
            ctx.body = {code:-5,message:"error"};
        }        
    });

	//删除
	app.router.post("/dai/remove/:model_name",async function(ctx){
        const model_name = ctx.params["model_name"];
        const MDai = dai.getDai(model_name);
        if(!MDai){
            ctx.body = {code:-4,message:"model not found "+model_name};
            return ;
        }

        try {
            ctx.body = await MDai.remove(ctx.request.body);
        } catch (error) {
            app.logger.error(error);
            ctx.body = {code:-5,message:"error"};
        }  

    });

	//添加
	app.router.post("/dai/add/:model_name",async function(ctx){
        const model_name = ctx.params["model_name"];
        const MDai = dai.getDai(model_name);
        if(!MDai){
            ctx.body = {code:-4,message:"model not found "+model_name};
            return ;
        }

        try {
            ctx.body = await MDai.add(ctx.request.body);
        } catch (error) {
            app.logger.error(error);
            ctx.body = {code:-5,message:"error"};
        }  
    });

	//更新
	app.router.post("/dai/update/:model_name",async function(ctx){
        const model_name = ctx.params["model_name"];
        const MDai = dai.getDai(model_name);
        if(!MDai){
            ctx.body = {code:-4,message:"model not found "+model_name};
            return ;
        }

        try {
            ctx.body = await MDai.update(ctx.query,ctx.request.body);
        } catch (error) {
            app.logger.error(error);
            ctx.body = {code:-5,message:"error"};
        }
    });

    //统计
	app.router.get("/dai/count/:model_name",async function(ctx){
        const model_name = ctx.params["model_name"];
        const MDai = dai.getDai(model_name);
        if(!MDai){
            ctx.body = {code:-4,message:"model not found "+model_name};
            return ;
        }

        try {
            ctx.body = await MDai.count(ctx.query);
        } catch (error) {
            app.logger.error(error);
            ctx.body = {code:-5,message:"error"};
        }
    });
    
	//自定义
	app.router.post("/dai/action/:action_name/:model_name",async function(ctx){
        const model_name = ctx.params["model_name"];
        const MDai = dai.getDai(model_name);
        if(!MDai){
            ctx.body = {code:-4,message:"model not found "+model_name};
            return ;
        }

        try {
            const action_name = ctx.params["action_name"];
            ctx.body = await MDai.action(action_name,ctx.request.body);
        } catch (error) {
            app.logger.error(error);
            ctx.body = {code:-5,message:"error"};
        }
    });
};
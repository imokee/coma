
;(function(global, factory) {
	"use strict";
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = factory( global, true);
	} else {
		factory(global);
	}
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var __components = {},__plugins = {};

    var H5x = {        
        component:function(){         
            var module_name,
                pmodules=[],
                init,
                proto;

            for(var i=0;i<arguments.length;i++){
                var arg = arguments[i];
                if(!arg) return ;
                if(typeof arg == "string"){
                    module_name = arg;
                }else if(typeof arg == "function"){
                    init = arg;
                }else if(arg instanceof Array){
                    pmodules = arg;
                }else if(typeof arg == "object"){
                    proto = arg;
                }
            }

            //console.log();

            var M = function(){
                if(M.parents){
                    var self_ = this;
                    M.parents.forEach(function(P){
                        P.apply(self_,arguments);
                    });
                }

                if(typeof init == "function"){
                    init.apply(this,arguments);
                }
            };

            M.prototype["use"] = function(name,opts){
                return H5x.use(this,name,opts);
            };

            var self = this;
            pmodules.forEach(function(pname){
                if(pname && __components[pname]){
                    self.extend(M,__components[pname]);
                }else{
                    console.error("not found component '"+pname+"'");
                }
            });

            for(var x in proto){
                M.prototype[x] = proto[x];
            }

            if(module_name){
                __components[module_name] = M;
            }
            
            return M;
        },

        plugin:function(name,init){
            __plugins[name] = init;
        },

        use:function(component,name,opts){
            //console.log(component);
            if(__plugins[name]){
                return __plugins[name](component,opts);
            }
        },

        extend:function(M,P){        
            if(P){
                if(!M.parents){
                    M.parents = [];
                }
                M.parents.push(P);
                for(var x in P.prototype){
                    M.prototype[x] = P.prototype[x];
                }
            }
        },

        utils : {
            getQuery : function(name) {
                var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
                if (result == null || result.length < 1) {
                    return "";
                }
                return result[1];
            },

            parseJSON : function(d){
                if(!d) return null;
                if(typeof d == "object") return d;
                if(typeof d == "string"){
                    try{
                        return JSON.parse(d);
                    }catch(e){
                        return null;
                    }
                }
                return d;
            },

            getCookie : function(name) {
                var dc = document.cookie;
                var prefix = name + "=";
                var begin = dc.indexOf("; " + prefix);
                if (begin == -1) {
                    begin = dc.indexOf(prefix);
                    if (begin != 0)
                        return null;
                } else {
                    begin += 2;
                }
                var end = document.cookie.indexOf(";", begin);
                if (end == -1) {
                    end = dc.length;
                }
                return unescape(dc.substring(begin + prefix.length, end));
            },

            setCookie : function(name, value, hs, path) {
                var str = [name + "=" + escape(value)];
                if (hs > 0) {
                    var date = new Date();
                    var ms = hs * 3600 * 1000;
                    date.setTime(date.getTime() + ms);
                    str.push(" expires=" + date.toGMTString());
                }

                if (!path) {
                    path = "/";
                }
                str.push(" path=" + path);
                document.cookie = str.join(";");
            },

            getStorage : function(key) {
                if (window.localStorage) {
                    return window.localStorage.getItem(key);
                } else {
                    return $.getCookie(key);
                }
            },

            setStorage : function(key, value) {
                if (window.localStorage) {
                    window.localStorage.setItem(key, value);
                } else {
                    $.setCookie(key, value, 24 * 5);
                }
            }

        }


    };

    window.H5x = H5x;

    var extended = window.jQuery || window.Zepto;
    
    if(extended){
        extended.H5x = H5x;
        extended.fn.make = function(module_name,opts){
            var M = __components[module_name];
            if(!M){
                console.error("not found component '"+module_name+"'");
                return ;
            }
            opts = opts || {};
            opts.container = $(this);   
            var com = new M(opts);
            return com;
        }

        extended.fn.route = function(url,opts){

            $el = $(this);

            page(url,function(ctx,next){
                var com_name = ctx.params.com_name;
                if(opts.filter){
                    opts.filter(ctx,function(){
                        go_page(com_name,ctx.params);
                    });
                }else{
                    go_page(com_name,ctx.params)
                }
            });

            page.start();

            function go_page(com_name,params){
                setTimeout(function(){
                    var com = $el.make(com_name,{
                        params : params
                    });

                    if(!com){
                        var dfpage = opts.default || "index";
                        if(dfpage != com_name){
                            page(dfpage);
                            //go_page(dfpage,params)
                            //$el.make(dfpage);
                        }                        
                    }
                },10);                
            }   
        }
    }


    //使用举例:"{1}{0}".format('a','b'); ==> 'ba'
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g,
            function(m, i) {
                return args[i];
            }
        );
    };

    String.prototype.trim = function() {
        return this.replace(/^\s+/,"").replace(/\s+$/,"");
    };

    Date.prototype.pattern = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };

        var week = {
            "0": "\日",
            "1": "\一",
            "2": "\二",
            "3": "\三",
            "4": "\四",
            "5": "\五",
            "6": "\六"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\星\期" : "\周") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

    return H5x;
});
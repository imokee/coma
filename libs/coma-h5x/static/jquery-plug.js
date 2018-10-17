;
(function($) {


    $.tip = function(text) {
        var panel = $("<div style='position:fixed;bottom:20px;left:0;padding:20px;text-align:center;width:100%;z-index:10002;'>" +
            "<span style='background:rgba(0,0,0,0.8);color:#FFFFFF;padding:10px 20px;font-size:18px;'>" + text + "</span>" +
            "</div>").appendTo(document.body);

        setTimeout(function() {
            panel.fadeOut(800, function() {
                panel.remove();
            });
        }, 2500);
    };


    $.getQuery = function(name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    };

    $.fn.tap = function(callback) {
        this.each(function(){
            var $el = $(this);
            var moving;
            $($el).on("touchstart",function(){ 
                moving = false;   
                //console.log(moving);            
            })

            $($el).on("touchmove",function(){
                moving = true;  
                //console.log(moving);   
            })

            $($el).on("touchend",function(evt){
                //console.log(moving);   
                if(!moving){
                    callback.apply(this,evt);
                } 
            })
        });
    };

    $.fn.render = function(templateid,data,append){
        var html = template(templateid, data);
        if(append){
            $(this).append(html);
        }else{
            $(this).html(html);
        }

        return this;
        
    }

    $.form = {
        isEmpty: function(str) {
            if (!str && str !== 0) return true;
            if (str.replace(/(^s*)|(s*$)/g, "").length == 0) return true;
            return false;
        },

        isEmail: function(str) {
            if (/^[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,5}$/.test(str)) {
                return true;
            }
            return false;
        },

        isWebUrl: function(str) {
            var reg = /^https?:\/\/([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/;
            return reg.test(str);
        },

        isPhone: function(str) {
            var reg = /^1\d{10}$/;
            if (reg.test(str)) {
                return true;
            }
            return false;
        },

        isInt: function(str) {
            var reg = /^[1-9]\d*$/;
            if (reg.test(str)) {
                return true;
            }
            return false;
        },

        hasIllegalChar: function(w) {
            return /[<>@#\$%\^&\*]+/g.test(w);
        }
    }


    $.fn.getJson = $.fn.serializeJson = function() {
        var serializeObj = {};
        //console.log(this.serialize());
        //console.log(this.find("input[name='title']").val());
        var fields = $(this).find("input,select,textarea").not(".file-upload>*");
        $(fields.serializeArray()).each(function() {
            //console.log(this);
            serializeObj[this.name] = this.value;
        });
        return serializeObj;
    };


    $.loadScript = function(src, callback) {
        if (!src) {
            callback();
            return;
        }

        var oScript = document.createElement('script');
        oScript.setAttribute('src', src);
        oScript.setAttribute('type', 'text/javascript');

        oScript.onload = function() {
            callback(oScript);
        }

        oScript.onerror = function() {
            callback(oScript);
        }

        $("head")[0].appendChild(oScript);
    };

    $.createShortId = function() {
        var endtime = 1440000000000;
        var ntime = new Date().getTime();
        ntime = ntime - endtime;
        var rand = parseInt(Math.random() * 90) + 10;
        var code = parseInt(rand + "" + ntime);
        return code.toString(36);
    }

})(window.jQuery || window.Zepto);
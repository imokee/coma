/**
 * useage
 *
 * this.use("daipager"); 
 * 
 */

;(function(){
    var datacache = {};
    H5x.plugin("dailoader",function(component){
        component.dailoader = {
            create : function(dai,opts){
                return new DaiLoader(dai,opts);
            }
        };

        return component.dailoader;
    });

    function DaiLoader(dai,opts){
        this.dai = dai;
        if(opts && opts.query){
            this._query = opts.query;
        }

        this.exquery = {};

        this.pager = {
            page:0,
            size:10
        };
    }

    DaiLoader.prototype = {
        load:function(query,callback){

            if(this.ended) return ;
            if(this.loading) return ;
            this.loading = true;

            if(!callback && typeof query == "function"){
                callback = query;
                query = null;
            }

            var q = {
                _page : this.pager.page, 
                _size : this.pager.size
            };

            if(this._query){
                for(var n in this._query){
                    q[n] = this._query[n];
                }
            }

            if(query){
                this.exquery = query;                
            }

            for(var n in this.exquery){
                q[n] = this.exquery[n];
            }

            var self = this;
            this.dai.query(q,function(rs){
                if(rs.list.length < q._size){
                    self.ended = true;
                }
                self.loading = false;
                callback(rs);                             
            });
        },
        nextpage : function(callback){
            if(this.ended) return ;
            this.pager.page++; 
            if(typeof callback == "function"){
                this.load(callback);  
            }
        },
        reset : function(){
            this.ended = false;
            this.pager.page = 0;
            this.exquery = {};
        }
    }
})();

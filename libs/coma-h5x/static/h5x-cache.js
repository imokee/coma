/**
 * useage
 *
 * this.use("render"); 
 * this.render("view-name",{...});
 * 
 */

;(function(){
    var datacache = {};
    H5x.plugin("cache",function(component){
        component.cache = datacache;
        return datacache;
    });
})();

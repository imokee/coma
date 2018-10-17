/**
 * useage
 *
 * this.use("render"); 
 * this.render("view-name",{...});
 * 
 */
H5x.plugin("render",function(component){

    component.render = function(view_name,data,onrender){

        var html = template(view_name, data);

        if(typeof onrender == "function"){
            onrender(html);
        }else{
            component.container.html(html);
        }
    }

    return component.render;
});
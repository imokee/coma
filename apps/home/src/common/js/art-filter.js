
template.defaults.imports.dateFormat = function(date, format){
    if(date){
        return new Date(date).pattern(format);
    }else{
        "";
    }
    
};

template.defaults.imports.deliverInfo = function(detail){
    try{
        var details = JSON.parse(detail);
        for(var i=0;i<details.length;i++){
            if(details[i].type == "elegant"){
                return details[i].name;
            }
        }
    }catch(e){
        console.log(e);
    }
    return "无";
    
};

template.defaults.imports.choosenDetail=function(detail){
    try{
        detail = JSON.parse(detail);
        var details = [];
        //console.log(detail);
        var photodetail = JSON.parse(detail.photodetail);
        photodetail.forEach(function(item) {
            details.push(item.name);
        });

        return details.join("+");

    }catch(e){
        return "";
    }

}

template.defaults.imports.showPhotoDetail=function(detail){
    detail = JSON.parse(detail);
    var details = [];
    detail.forEach(function(item) {
        details.push(item.name);
    });

    return details.join("+");
}

var statusmap = {
    1:"已报名",
    2:"已确认",
    3:"已拍照",
    4:"已选片",
    5:"已支付",
    6:"已修片",
    7:"已完成",
    11:"已取消"
}
template.defaults.imports.statusName=function(status){
    return statusmap[status] || "未知"
}




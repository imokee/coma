
exports.range = function(start,end){
    if(!end){
        end = start;
        start = 0;
    }
    var r = [];
    for(var i=start;i<end;i++){
        r.push(i);
    }

    return r;
}
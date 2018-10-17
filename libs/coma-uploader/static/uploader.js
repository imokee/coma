;
(function($) {

     /*
     * Upload
     */

    //将压缩后的二进制图片数据流append到formdata对象中上传到后台服务器
    //注意：上传的是formdata对象，后台接口接收的时候，也要从formdata对象中读取二进制数据流
    function formUpData(blobFiles,params,opts){
        var formData = new FormData();

        formData.append("files", blobFiles);

        for(var p in params){
            formData.append(p, params[p]);
        }
        
        var xhr = new XMLHttpRequest();
        
        xhr.open('post', opts.url || '/uploader/server');

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200 && opts.oncomplate) {
                opts.oncomplate(xhr.responseText);
            }
        };

        if(opts.onprogress){
            xhr.upload.addEventListener("progress", opts.onprogress, false);  
        }

        xhr.send(formData);
    }

    $.fn.imgCropper = function(opts){
        var html = $(`<div class="crop-container">
            <img class="copper-img" src="${opts.url}"/>
        </div>`);
        $(this).append(html);

        html.find(".copper-img").on("load",function(){
            const cropper = new Cropper(this, {
                aspectRatio: 1,
                crop : function(event) {
                    console.log(event.detail.x);
                    console.log(event.detail.y);
                    console.log(event.detail.width);
                    console.log(event.detail.height);
                    console.log(event.detail.rotate);
                    console.log(event.detail.scaleX);
                    console.log(event.detail.scaleY);
                }
            });
        })






    }

    $.fn.bindUpload = function(opts) {


        var multiple = opts.multiple ? "multiple" : "";

        var str = ["<div style='position:absolute;top:0px;left:0px;z-index:100'><form method='post' enctype='multipart/form-data' class='file-upload'>"];
        str.push("<input type='file' unselectable='on' name='file' " + multiple + "  accept='" + (opts.accept || "") + "'/>");
        str.push("</form>");
        str.push("</div>");

        var c = $(str.join(""));
        c.find("input[name='file']").css({
            "line-height": $(this).outerHeight() + "px",
            "width": (opts.width || $(this).outerWidth()) + "px",
            "height": (opts.height || $(this).outerHeight()) + "px",
            "opacity": 0,
            "cursor": "pointer"
        }).on("change", function() {
            if (!$(this).val()) {
                return;
            }

            var size = 0;
            //debugger;
            try {
                if (this.files && this.files[0]) {
                    size = this.files[0].fileSize || this.files[0].size;
                }

                if (!size) {
                    var img1 = new Image();
                    img1.dynsrc = this.value;
                    size = img1.fileSize;
                }

            } catch (e) {}

            //alert(size);
            var maxSize = opts.maxSize || 50000;
            if (size > maxSize * 1024) {
                if (maxSize >= 1000) {
                    $.tip("图片大小不能超过" + (maxSize / 1000) + "M");
                } else {
                    $.tip("图片大小不能超过" + maxSize + "K");
                }
                return;
            }


            try {
                if (typeof opts.onupload == "function") {
                    opts.onupload();
                }
            } catch (e) {
                alert(e);
            }

            var fileList = this.files;

            //处理图片列表，getCompressiveFileList接受处理后的图片数据列表
            var process = window.lzImgProcess();
            process(fileList,function(blobFileList){
                if(blobFileList){
                    blobFileList.forEach(function (blobFile, i) {
                        //console.log('正在上传第'+(i+1)+'张图片')
                        formUpData(blobFile,opts.params,{
                            oncomplate:opts.oncomplate,
                            url:opts.url,
                            onprogress:function(evt){
                                if (evt.lengthComputable) { 
                                    console.log(evt.total,evt.loaded);    
                                }  
                            }
                        });
                    })
                }
            });
        });

        $(this).append(c);
    };
})(jQuery);
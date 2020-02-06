function upload(container,option){
    this.containerobj = $('#'+container);
    this.option = {uploadtype:'Image',imgvalue:''};
    this.option = $.extend(this.option,option);
}

upload.prototype.init = function (ext){
    var _this = this;
    var option = {
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : this.containerobj.find('#pickfiles')[0], // you can pass in id...
        container: this.containerobj[0], // ... or DOM Element itself
        url : this.containerobj.attr('uploadurl'),
        flash_swf_url : base_url+'js/plupload/Moxie.swf',
        silverlight_xap_url : base_url+'js/plupload/Moxie.xap',
        unique_names:true,
        multi_selection:false,
        multiple_queues:false,

        filters : {
            max_file_size : '3mb',
            mime_types: [
                {title : this.option.uploadtype+" files", extensions : ext}
            ]
        },

        init: {
            PostInit: function() {
                _this.containerobj.find('#filelist').html('');
            },

            FilesAdded: function(up, files) {
                if(up.files.length>1){
                    up.removeFile(up.files[0]);
                }
                _this.containerobj.find('#filelist').empty();
                $.each(up.files, function (i, file) {
                    //_this.containerobj.find('#filelist').html('<div id="' + up.files[i].id + '">' + up.files[i].name + ' (' + plupload.formatSize(up.files[i].size) + ') <b></b></div>');
                    _this.containerobj.find('#filelist').html('<div id="' + up.files[i].id + '">文件 (' + plupload.formatSize(up.files[i].size) + ') <b></b></div>');
                });
                this.start();
            },

            UploadProgress: function(up, file) {
                _this.progress(up, file);
            },

            Error: function(up, err) {
                _this.error(up,err);

            },
            FileUploaded:function(up,file,res){
                _this.fileUploaded(up,file,res);
            }
        }
    };

    $(document).on('click', '#'+this.containerobj.attr('imgid')+' .delimg' ,function(e){
        var __this = $(this);

        var index = $("#"+_this.containerobj.attr('imgid')).find('.delimg').index($(this))-1;

        var filepath = $(this).prev('div > img').attr('rawsrc');

        var v = $("#"+_this.containerobj.attr('imgid')).find('#'+_this.option.imgvalue).val();
        if(v==''){
            var arr_v = [];
        }else{
            var arr_v = v.split(',');
        }

        $.post(site_url+"/upload/delphoto",{filename:filepath},function(data){
            __this.closest('li').remove();
            arr_v.splice(index,1);
            $("#"+_this.containerobj.attr('imgid')).find('#'+_this.option.imgvalue).val(arr_v.join(','));
        });
    });
    this.uploader_option = option;
    this.uploader = new plupload.Uploader(option);
    this.uploader.init();
};

upload.prototype.imgsize = function (ext){
    this.option.resize={width : 1024, height : 768, quality : 100, crop: true};
}

upload.prototype.fileUploaded = function (up,file,res){
    this.containerobj.find('#filelist').empty();
    if(!this.uploader_option.multiple_queues){
        $("#"+this.containerobj.attr('imgid')).find('img').last().closest('ul').find('li').not(':hidden').remove();
    }

    var r = $.parseJSON(res.response);
    var last = $("#"+this.containerobj.attr('imgid')).find('img').last();
    var cplast = last.closest('li').clone();
    var newimg = cplast.find('img');

    newimg.attr('src',base_url+'/upload/'+r.filePath);
    newimg.attr('rawsrc',r.rawfilePath);
    newimg.parent('a').attr('href',base_url+'/upload/'+r.rawfilePath);
    last.closest('ul').append(cplast);
    cplast.show();
    this.updateimgs(r.filePath);
}

upload.prototype.error = function (up, err){
    //document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
}

upload.prototype.progress = function (up, file){
    this.containerobj.find("#uploadfiles").prop('disabled',true);
    //this.document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>上传中：' + file.percent + "%</span>";
    //console.log(file.id);
    this.containerobj.find("#"+file.id).find('b').html('<span>上传中：' + file.percent + "%</span>");
}

upload.prototype.updateimgs = function (filepath){
    var v = '';
    if(this.uploader_option.multiple_queues){
        v = $("#"+this.containerobj.attr('imgid')).find('#'+this.option.imgvalue).val();
    }
    if(v==''){
        var arr_v = [];
    }else{
        var arr_v = v.split(',');
    }
    if(filepath){
        arr_v.push(filepath);
        $("#"+this.containerobj.attr('imgid')).find('#'+this.option.imgvalue).val(arr_v.join(','));
    }
}
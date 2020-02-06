var uploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : 'pickfiles', // you can pass in id...
	container: document.getElementById('container1'), // ... or DOM Element itself
	url : site_url+'/upload/equipmentImport',
	flash_swf_url : base_url+'js/plupload/Moxie.swf',
	silverlight_xap_url : base_url+'js/plupload/Moxie.xap',
	unique_names:true,
	multi_selection:false,
	multiple_queues:false,

	filters : {
		max_file_size : '10mb',
		mime_types: [
			{title : "xls,xlsx files", extensions : "xls,xlsx"}
		]
	},

	init: {
		PostInit: function() {
			document.getElementById('filelist').innerHTML = '';
		},

		FilesAdded: function(up, files) {
			if(up.files.length>1){
				up.removeFile(up.files[0]);
			}
			$('#filelist').empty();
			$.each(up.files, function (i, file) {
				document.getElementById('filelist').innerHTML = '<div id="' + up.files[i].id + '">' + up.files[i].name + ' (' + plupload.formatSize(up.files[i].size) + ') <b></b></div>';
			});

		},

//		UploadProgress: function(up, file) {
//
//			document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>上传中：' + file.percent + "%</span>";
//		},

		Error: function(up, err) {
			//document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
		},

		FileUploaded:function(up,file,res){
			$('#warnning').html("分析导入中,请稍后...");
			var r = $.parseJSON(res.response);
			//提交时检查数据//window.location.reload();
			var param = {};
			param.filename=r.filePath;
			ajax_post(site_url+"/equipment/import",param,function(msg){
					var err=[];
					if(msg.result!=1){
						$.each(msg.data,function(k,v){
								err.push(v);
						});
						$('#warnning').html(err.join('<br>'));
						return false;
					}else{
						$('#warnning').html("完成导入");
						window.location.reload();
					}
			},{async:true});

		}
	}
});

$(document).ready(function(){
	uploader.init();

	$("body").on('click','#btn_import',function() {
    	layer.open({
           		 btn: ['确定','取消'],
          		  type: 1,
           		 area: ['500px', '400px'],
          		  shade: false,
          		  title: false, //不显示标题
          		  content: $('#equipmentImport'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            	 yes: function(index, layero){
            		 	uploader.start();
            	}
  		});
    });



});

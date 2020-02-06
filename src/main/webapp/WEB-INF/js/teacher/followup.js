//选中
	function moveleft(obj){
		showclass = $(obj).attr('class');
		if(showclass){
			$(obj).removeClass('wodexueyuan_div_li_in');
		}else{
			$(obj).addClass('wodexueyuan_div_li_in');
		}
	}	

	//右移动
	function rightmobile(){
		str = '';
		$('#leftcontainer li').each(function(i){
			if($(this).attr('class')){
				$(this).removeClass("wodexueyuan_div_li_in");
				str+=this.outerHTML;
				$(this).remove();
			}
		})
		$("#rightcontainer").append(str); 
		editpeople();
		selectedid();
	}

	//左移动
	function leftmobile(){
		str = '';
		$('#rightcontainer li').each(function(i){
			if($(this).attr('class')){
				$(this).removeClass("wodexueyuan_div_li_in");
				str+=this.outerHTML;
				$(this).remove();
			}
		})
		$("#leftcontainer").append(str); 
		editpeople();
		selectedid();
	}

	//计算接收人
	function editpeople(){
		$('#floatpeople').html($('#rightcontainer li').length)
	}

	//选中的池子
	function selectedid(){
		str = '';
		rightLeng = $('#rightcontainer li').length-1;
		$('#rightcontainer li').each(function(i){
			if(i==rightLeng){
				str += $(this).attr('sign')
			}else{
				str += $(this).attr('sign')+','
			}
		})
		$('#selectedid').val(str);
	}

	//全选左侧
	function selectAll(obj){
		sign = $(obj).attr('sign');
		if(sign==1){
			//全部附加样式
			$('#leftcontainer li').each(function(i){
				$(this).addClass("wodexueyuan_div_li_in");		
			})
			$(obj).attr('sign','2')
		}else{
			$('#leftcontainer li').each(function(i){
				$(this).removeClass("wodexueyuan_div_li_in");		
			})
			$(obj).attr('sign','1')
		}
	}

	//清空右侧
	function emptydate(){
		$('#rightcontainer').empty();
		editpeople();
		selectedid();	
	}

	//选择学生级别时
	$('#studenLevel').on('change',function(){
		selectLevelvel = $('#studenLevel').val();
		ajaxRefresh(selectLevelvel,$('#studenInfo').val())
	})
	
	//当用户选择了输入框
	$('#studenInfo').bind('input propertychange',function(){
		ajaxRefresh($('#studenLevel').val(),$('#studenInfo').val())		
	})
	
	var upload = layui.upload;
	
	//上传"uploadannex"
	upload.render({
	  	elem: '#uploadannex'
		,url:  site_url+'/upload/uploadLearnannex'
		,accept:'file'
		,size:'5120'
		,multiple:true
	  	,done: function(res, index, upload){
	  		str = '';
	  		str = '<li sign='+res.rawfilePath+'>'+res.filePath+'<i type="button" onclick="delupload(this)" class="glyphicon glyphicon-remove pull-right " style="cursor: pointer;"></i></li>';
			$('#uploadInfo').append(str);
	  	}
	})
	
	//删除附件
	function delupload(obj){
		$(obj).parent().empty();
	}
	
	//拿取全部附件
	function getLearnannex(){
		uploadInfoLeng = $('#uploadInfo li').length-1;
		str = '';
		$('#uploadInfo li').each(function(i){
			if(i==uploadInfoLeng){
				str += $(this).attr('sign')
			}else{
				str += $(this).attr('sign')+'~'
			}
		})
		return str;
	}
	
	function ajaxRefresh(selectLevelvel='',studenInfo=''){
		ids = $('#selectedid').val();
		ajax_post(site_url+"/FollowUp/getMyStuden",{'selectLevelvel':selectLevelvel,'studenInfo':studenInfo,'ids':ids},function(data){ 				
			str = '';
			$('#leftcontainer').empty();//先清除左边池子
			if(data.status==1){
				$(data.data).each(function(i,e){
					str +='<li sign="'+e.id+'" onclick="moveleft(this)">'+e.id+'&nbsp;'+e.name+'</li>';
				});
			}
			$('#leftcontainer').append(str);
		});
	}

	function add(){
		themename = $('#themename').val();
		theway = $('#theway').val();
		statrtime = $('#statrtime').val();
		endTime = $('#endTime').val();
		ids = $('#selectedid').val();
		NoteInfo = $('#NoteInfo').val();//备份
		Learnanne = getLearnannex();

		
		if(ids==''){
			layer.msg('请选择接收人！', {icon: 2});
			return false;
		}
		
		/*if(!parseInt(themename)){
			layer.msg('请填写主题', {icon: 2});
			return false;
		}*/

		if(themename.length<1||themename.length>30){
			layer.msg('主题内容1~30个字符', {icon: 2});
			return false;
		}
		if(theway==''){
			layer.msg('请选择方式', {icon: 2});
			return false;
		}
		if(statrtime==''){
			layer.msg('请填写课程开始时间', {icon: 2});
			return false;
		}
		if(endTime==''){
			layer.msg('请填写课程结束时间', {icon: 2});
			return false;
		}
		if(statrtime>endTime){
			layer.msg('开始时间不能大于结束时间', {icon: 2});
			return false;
		}
		/*if(Learnanne==''){
			layer.msg('请上传附件', {icon: 2});
			return false;
		}*/
		if(NoteInfo.length>200){
			layer.msg('备注的字节不能大于200', {icon: 2});
			return false;
		}
		
		var param = {};
		param.themename  	 = themename;
		param.theway  		 = theway;
		param.statrtime  	 = statrtime;
		param.endTime  		 = endTime;
		param.ids  		 	 = ids;
		param.NoteInfo  	 = NoteInfo;
		param.Learnanne  	 = Learnanne;
		ajax_post(site_url+"/FollowUp/save",param,function(data){ 				
			if(data.status==1){
				layer.msg('保存成功！！', {icon: 1,shade :0.7,time:2000},function(index){
		    		layer.close(index);
		    		window.location.href=site_url+"/FollowUp/index";   
		    	});
			     		
			}else{
				layer.msg('保存失败！！',{icon: 2,shade :0.7,time:2000})
			}
		});
	}
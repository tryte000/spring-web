document.write('<div style="display:none;"><form id="backToOperate" action="" method="post"><input name="isBackOperate" value="1" /></form></div>');
/**
 * 后退
 * @param url
 * @returns
 */
function backToOperate(url) {
	if (typeof(url) == 'undefined')
		url = document.referrer;
	$("#backToOperate").attr('action', url);
	$("#backToOperate").submit();
}

/**
 * 弹出确认框 post事件
 * @param url
 * @param param
 * @param msg
 */
function confirmJump(url, param, msg) {
	layer.confirm(msg,{title:'提示'}, function(conindex) {
		layer.close(conindex);
		postJump(url, param);
	});
}

/**
 * post事件
 * @param url
 * @param param
 * @returns
 */
function postJump(url, param) {
	var temp = layer.load(0, {shade: [0.5,'#808080']});
	$.post(url, param, function(result) {
		layer.close(temp);
		layer.alert(result.msg, function(index) {
			layer.close(index);
			if (result.status == 1) {
				backToOperate(window.location.href);
			}
		});
	}, 'json');
}

/**
 * post事件 成功不弹框
 * @param url
 * @param param
 * @returns
 */
function postJumpWithoutAlert(url, param) {
	var temp = layer.load(0, {shade: [0.5,'#808080']});
	$.post(url, param, function(result) {
		layer.close(temp);
		if (result.status == 1) {
			backToOperate(window.location.href);
		} else {
			layer.alert(result.msg);
		}
	}, 'json');
}


/**
 * AJAX
 */
 function ajax(url,param,type,callback,opt){
	 var option = {
				  url:url,
				  type:"POST",
				  data:param,
				  timeout:10000,
				  dataType:"json",
				  success:function(data){
					  if(jQuery.type(data) === "string" && data.indexOf('@账户登录@')>=0){
							 alert('登录超时，请重新登录');
							 window.location.href=site_url+'/login';
							 return false;
						 }
						 callback(data);
				  },
				  error:function(){
					  console.log('error');
				  }
	 };
	 option = $.extend(option,opt);
	 return $.ajax(option);
 }

 function ajax_post(url,param,callback,opt){
	 return ajax(url,param,'post',callback,opt);
 }

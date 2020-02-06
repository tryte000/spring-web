function Form(option,url,submitbtn){
	this.opt = option;
	this.validate;
	this.url = url;
	this.submitbtn = submitbtn;
	this.submitbtnTitle = '保存';
	this.currentsubmitbtn = {};
}

Form.prototype.init = function(){
	var _this = this;
	if(_this.submitbtn.substring(0,1)=='.'){
		_this.submitbtn = $(this.submitbtn);
	}else{
		_this.submitbtn = $("#"+this.submitbtn);
	}
/*	$("#"+this.submitbtn).click(function(){
		$("#"+_this.opt.formId).submit();
	});*/
	_this.submitbtn.click(function(){
		_this.currentsubmitbtn = $(this);

		if(_this.submitbtn.is('input')){
			_this.submitbtnTitle = $(this).attr('value');
		}
		if(_this.submitbtn.is('button')){
			_this.submitbtnTitle = $(this).html();
		}
		if(_this.presubmit(this)){
			$("#"+_this.opt.formId).submit();
		}
	});
	this.initValue();
	this.initValidator();

}

Form.prototype.presubmit = function(obj){return true;}


Form.prototype.submitedCallBack = function(data){
	layer.alert(data.msg, function(index){
		layer.close(index);

		if (typeof(backToOperate) == 'function')
			backToOperate(document.referrer);
		else
			window.location.href = document.referrer;
	});
}

Form.prototype.submited = function(data){

	if(data.status==1){
		this.submitedCallBack(data);
	}else{
		if(data.data){
			$.each(data.data,function(k,v){
				var temp = $("#"+k);
				var element = temp;
				var show = temp.attr('data-show');
				if (show) {
					element = $(show);
				}
				var index = $("span[data-for='"+k+"']").attr('data-layer-index');
				if (index > 0)
					layer.close(index);
				temp.focus();
				index = layer.tips(v, element, {time:0,tipsMore:true});
				$("span[data-for='"+k+"']").attr('data-layer-index',index);
				$("span[data-for='"+k+"']").attr('data-error', v);
				return false;
			});
		}else{
			layer.alert(data.msg, function(index){
				layer.close(index);
				if (data.code == '110003')
					window.location.reload();
			});
		}
	}

}

Form.prototype.initValue = function(){
	var _this = this;
	$.each(this.opt.items,function(k,v){
		if(v.datalist.length){
			if(v.type=='select'){
					$("#"+v.id).find('option').empty();
					var arr_options = [];
					var optionconfig = v.optionConfig;
					$.each(v.datalist,function(k1,v1){
						var deepnum = 0;
						var prefix='';
						if(optionconfig.other.deepkey){
							deepnum = v1[optionconfig.other.deepkey];
						}
						for(var i=0;i<deepnum;i++){
							prefix+='|--';
						}
						arr_options.push('<option value="'+v1[optionconfig.idkey]+'">'+prefix+v1[optionconfig.titlekey]+'</option>');
					});
			}
			$("#"+v.id).html(arr_options.join(''));
		}

		_this.setDefault(v);
	});
};

Form.prototype.setDefault = function(v){
		if(v.type=='input' || v.type=='textarea' || v.type=='hidden'){
			$("#"+v.id).val(v.value);
		}else if(v.type=='select'){
			$("#"+v.id).find('option[value="'+v.value+'"]').prop('selected',true);
		}else if(v.type=='checkbox' || v.type=='radio'){
			if(!v.value){
				return true;
			}
			var value = v.value.split(',');
			if(v.group!=''){

			}
			$("[name="+v.id+"]").each(function(){
				if($.inArray($(this).val(),value)>=0){
					$(this).prop('checked',true);
				}
			});
		}else if(v.type=='group'){
			var type = '';
			$.each(v.child,function(k1,v1){
				type = v1.type;
				return false;
			});
			/*TODO 未完成*/
		}
};

Form.prototype.getItemValue = function(r,type){
	if(type=='checkbox' || type=='radio'){
			return function(){return $("[name="+r+"]:checked").val();};
	}else{
			return function(){return $("#"+r).val();};
	}
};

Form.prototype.initValidator = function(){
	var _this = this;
	this.validate = $("#"+this.opt.formId).validate({
		ignore:'',
		errorPlacement	: function(error, element) {
			var temp = element.attr('data-error-appendto');
			if (temp) {
				temp = $(temp);
			} else {
				temp = element;
			}
			
			var oldindex = element.attr('data-layer-index');
			if(oldindex>0){
				layer.close(oldindex);
			}
			if(error.html()!=''){
				var index = layer.tips(error.html(), temp, {time:0,tipsMore:true});
				element.attr('data-layer-index',index);
			}
			
		},
		/*
		showErrors:function(errorMap, errorList){
			console.log('showErrors');
			_this.validatorErrorCallback(errorMap);
			this.defaultShowErrors();
		},
		*/
		success:function(label){
			layer.close();
		},
		errorElement : "span",
		errorClass : 'form-txt',
		submitHandler: function(form){
			_this.submit();
		}
	});

	//循环各表单元素
	$.each(this.opt.items,function(k,v){
		var opt = {};
		var message = {};
		var validators = v.validator;
		for(var i=0;i<validators.length;i++){
			if(validators[i][3]==true){//远程验证
				var remoteopt = {
							 url: site_url+'/'+validators[i][1],
							 type: "post",
							 dataType: "json"
						 };
				remoteopt['data']={};
				remoteopt['data'][v.id] =  function () {
					if(v.type=='checkbox' || v.type=='radio'){
						return $("[name="+v.id+"]").val();
					} else {
						return $("#"+v.id).val();
					}
				};
				//相关者
				if(validators[i][2] && validators[i][2].length>0){
					for(var n=0;n<validators[i][2].length;n++){
						var r = validators[i][2][n];
						_this.currentitem = r;
						_this.currenttype = v.type;
						var temp = _this.SelectItem(r);
						remoteopt['data'][r] = _this.getItemValue(r,temp.type);
					}
				}
				opt['remote']= remoteopt;


			}else{//js 验证
				var temp = validators[i][0];
				temp = temp.replace(/\\/g, '_');
				opt[temp]=validators[i][1];
			}

			//自定义消息
			if(validators[i][4]){
					if(!message[v.id]){
						message[v.id]={};
					}
					if(validators[i][3]==true){
						message[v.id]['remote'] = validators[i][4];
					}else{
						message[v.id][validators[i][0]] = validators[i][4];
					}
					opt['messages']=message[v.id];
			}
			if($("#"+v.id).length>0){
				$("#"+v.id).rules("add", opt);
			}

		}
	});
};

Form.prototype.SelectItem = function(id) {
	var ObjTemp;
	$.each(this.opt.items, function(k,v){
		if (v.id==id) {
			ObjTemp = v;
			return false;
		}
	});
	return ObjTemp;
};

Form.prototype.submit = function(){
	var param = {};
	var _this = this;
	param.submitform = 1;
	$.each(this.opt.items,function(k,v){
		if(v.type=='checkbox' || v.type=='radio'){
			var value = [];
			$("[name="+v.id+"]").each(function(){
				if($(this).is(":checked")){
					value.push($(this).val());
				}
			});
			param[v.id] = value.join(',');
		}else if(v.type=='textarea'){
			param[v.id] = $("textarea[name="+v.id+"]").val();
		}else{
			param[v.id] = $("#"+v.id).val();
		}
	});
	_this.submitbtn.prop('disabled',true);
	var oldtitle = '';
	if(_this.submitbtn.is('input')){
		oldtitle = _this.submitbtn.attr('value');
	}
	if(_this.submitbtn.is('button')){
		oldtitle = _this.submitbtn.html();
	}

	$.post(this.url,param,function(data){
		_this.submitbtn.prop('disabled',false);
		if(_this.submitbtn.is('input')){
			_this.currentsubmitbtn.attr('value',_this.submitbtnTitle);
		}
		if(_this.submitbtn.is('button')){
			_this.currentsubmitbtn.html(_this.submitbtnTitle);
		}
		_this.submited(data);
	},'json');
};

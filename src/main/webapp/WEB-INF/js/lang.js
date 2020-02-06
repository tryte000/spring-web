function Lang(l){
	this.language = l;
	this.map = [];
	//更改默认语言设置
	this.selectId = '';
	this.postUrl = '';
	this.postData = '';
}

Lang.prototype.init = function(){
	var _this = this;
	ajax_post(site_url+'/lang/jsget',{l:this.language},function(data){
		if(data){
			_this.map = data;
		}
	},{async: false});
}

Lang.prototype.get = function(key,def){
	if(this.map[key]){
		return this.map[key];
	}
	return def;
}

//获得当前选中语言
Lang.prototype.getSelectLang = function(){
	return $('#'+this.selectId).val();
}
Lang.prototype.setSelectId = function(selectId){
	this.selectId = selectId;
}
Lang.prototype.setPostUrl = function(postUrl){
	this.postUrl = postUrl;
}

//回调函数
Lang.prototype.CallBack = function(data){
	if(data.result==1){
		location.reload();
		return false;
	}
}

//ajax提交
Lang.prototype.ajaxPost=function(){
	var _this = this;
	this.postData = {"defaultLang":this.getSelectLang()};
	$.post(this.postUrl, this.postData, function(data){
		_this.CallBack(data);
	},'json');
}
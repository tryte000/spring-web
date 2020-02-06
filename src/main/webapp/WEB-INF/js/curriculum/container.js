/**
 * 页面容器
 */
function Container(){
	this.date = '';
	this.timeArr = []; //点击展开，获取的数据字典中的  时间  10：00 - 10：10
	this.addValueKey = 'dateId';
	this.dateUrl = site_url+'';
}

/**
 * 展开
 * @param obj  展开按钮对象
 */
Container.prototype.open = function(obj){
	//获取日期  //TODO PHP循环的时候记得带上这个
	this.date = obj.attr('date');
	var _this = this;
	if (_this.timeArr.length < 0){
		_this.dateAjax();
	}
	var html = '<div class="kechengshumu_div">'+
					'<ul>';
	$.each(this.timeArr,(function(i,v){
		html += this.openHtml(v,i);
	});
	html += '</ul>'+
		'</div>';
	//渲染
	obj.before(html);
};
//展开后，获取左侧数据的日期
Container.prototype.dateAjax = function(){
	var _this = this;
	var param = {};
	ajax_post(_this.dateUrl,send,function(data){
		_this.timeArr = data.data;
	});
};
//打开后的li
Container.prototype.openHtml = function(title,value){
	var html = '<li>'+
		'<span class="shijian_span">'+title+'</span>'+
		'<div class="bianjikecheng_display">'+
			'<p class="tianjialeixing_span ">'+
				'<span class="margin_left10">'+
					'<button type="button"  '+this.addValueKey+'="'+value+'" class="btn btn-default btn-primary btn-xs "><i class="glyphicon glyphicon-plus" ></i>添加</button>'+ 
				'</span>'+
			'</p>'+
		'</div>'+
	'</li>'+
	'<div class="clearfix"></div>';
	return html;
};



/**
 * 添加
 */
Container.prototype.add = function(){
	
};


/**
 * 删除
 */
Container.prototype.del = function(){
	
};
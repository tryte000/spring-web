//分页类
function Paging(p) {
	this.offset = p.offset;		//偏移
	this.limit = p.limit;			//条数
	this.height = $(document).height()-$(window).height();	//浏览器高度
	this.status = 1;	//请求是否结束
	this.scroll = 0;
}

//判断当前是否滑动到底部
Paging.prototype.isBottom = function(height) {
	if ( this.height <= height ) {
		this.ready();
	}
}

//当滑动到底部时执行的方法
Paging.prototype.ready = function() {
	
}

//滑动监听
Paging.prototype.init = function() {
	var _this = this;
	$(document).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(window).height();
		if((scrollTop + windowHeight >= scrollHeight) && (_this.scroll == 0) && _this.status == 1){
			_this.scroll = 1;
			_this.isBottom($(document).scrollTop());
		}
	})
	// 正确的
//	$(document).scroll(function(){
//		var scrollTop = $(document).scrollTop();
//		var scrollHeight = $(document).height();
//		var windowHeight = $(window).height();
//		if((scrollTop + windowHeight >= scrollHeight) && (_this.scroll == 0) && _this.status == 1){
//			_this.scroll = 1;
//			_this.height = scrollHeight - windowHeight;
//			_this.isBottom(scrollTop);
//		}
//	})
}

Paging.prototype.unlockLoad = function() {
	this.scroll = 0;
}

Paging.prototype.endLoad = function() {
	this.status = 0;
}
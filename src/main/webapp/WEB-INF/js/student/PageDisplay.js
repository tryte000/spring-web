//翻页显示
function PageDisplay(init) {
	//每次翻页的长度
	this.lenth = init.lenth;
	//整体长度
	this.long = init.long;
	//第一下标
	this.first = 0;
	//结束长度下标
	this.end = 0;
	//开始下标
	this.start = 0;
	//页码
	this.startnum = 0;
	this.endnum = 1;
}

//初始化
PageDisplay.prototype.init = function( end ) {
	this.end = end;
}

//右翻页
PageDisplay.prototype.next = function() {
	//计算下个开始下标
	var nextStart = this.end + 1;
	if( nextStart >= this.long ) {
		nextStart = this.start;
	}
	this.start = nextStart ;
	
	//计算下个结束下标
	var nextEnd = this.end + this.lenth;
	
	if( nextEnd >= this.long ) {
		nextEnd = this.long;
	}
	if( nextEnd > this.end+1 ){
		this.endnum = this.endnum + 1;
	}
	this.end = nextEnd;
	$("#yema").text(this.endnum);
	//查找符合的元素并隐藏
	$('*[show]').each(function(index,temp) {
		//获取当前元素位置
		var postion = $(temp).attr("show");
		//显示
		if ( postion >= nextStart && postion <= nextEnd  ) {
			$(temp).show();
		} else {
			$(temp).hide();
		}
	});
}

//左翻页
PageDisplay.prototype.back = function() {
	//计算下个开始下标
	var nextStart = this.start - this.lenth;
	if( nextStart <= this.first ) {
		nextStart = this.first;
	}
	this.start = nextStart;
	//计算下个结束下标
	var nextEnd = this.start + this.lenth - 1;

	if( nextEnd <= this.first ) {
		nextEnd = this.end ;
	}
	if( nextEnd < this.end ){
		this.endnum = this.endnum-1;
	}
	this.end = nextEnd;
	$("#yema").text(this.endnum);
	//查找符合的元素并隐藏
	$('*[show]').each(function(index,temp) {
		//获取当前元素位置
		var postion = $(temp).attr("show");
		//显示
		if ( postion >= nextStart && postion <= nextEnd  ) {
			$(temp).show();
		} else {
			$(temp).hide();
		}
	});
}
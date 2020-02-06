function Page(){
	this.page = null;
	this.option = {};
	this.contentobj = null;
	this.searchform = null;
}

Page.prototype.init = function (page,opt,contentobj){
	this.page = page;
	this.option = opt;
	this.contentobj = contentobj;
	var _this = this;
	
	if($.isEmptyObject(this.option) ){
		return false;
	}
	
	$(".page_totalpage").find('span').text(_this.option.m);
	$(".page_c").each(function(i){
		var tag = $(this).attr('tag');
		var url = _this.option[tag];
		$(this).click(function(){
				_this.loadlist(_this.option.pageurl+url);
		});
	});
	
	var a = $('.pageno').children();
	$.each(this.option.bar,function(i,v){
		var a1 = a.clone();
		a1.html((v.num));
		a1.show();
		if(_this.option.t==v.num){
			a1.addClass('in');
		}
		$('.pageno').append(a1);
		a1.click(function(){
			$('.pageno').find('.in').removeClass('in');
			$(this).addClass('in');
			_this.loadlist(_this.option.pageurl+v.ln);
		});
	});
	
	this.page.find('.page_jumpinput').keyup(function(){
		_this.valid();
	});
	
	this.page.find('.page_jump').click(function(){
		_this.jump($('.page_jumpinput').val());
	});
};

Page.prototype.bindform = function (form){
	this.searchform = form;
}

Page.prototype.loadlist = function (url){
	this.gotourl(url);
	/*
	var _this = this;
	$.get(url, function(data){
		console.log(data);
	  	_this.contentobj.find('tbody').html(data);
	});
	*/
}

Page.prototype.loaded = function (callback){
	callback();
}

Page.prototype.jump = function (p){
	var page = this.page.find('input').val().replace(/[^\d]/g, '');
	if(page==''){
		page=1;
	}
	var max =  100;
	if (page <= 0 || page > max) {
		this.page.css('border', '1px solid red');
		return false;
	}
	if(p>this.option.m){
		this.page.find('input').val(this.option.m);
		return false;
	}
	url = this.option.pageurl+'?page='+p;
	this.gotourl(url);
}

Page.prototype.gotourl = function (url){
	if(this.searchform.length){
		this.searchform.attr('action',url);
		this.searchform.submit();
	}else{
		window.location.href =url;
	}
}

Page.prototype.valid = function (){
	this.page.val(this.page.find('input').val().replace(/[^\d]/g, ''));
};
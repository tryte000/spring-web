/**
 * 表单验证 jquery.validate插件   扩展
 * 
 */
//错误提示  中文格式
jQuery.extend(jQuery.validator.messages, {
	required: "必填",
	//remote: "请正确填写",
	email: "請輸入正確格式的電子郵件",
	url: "請輸入合法的網址",
	date: "請輸入合法的日期",
	dateISO: "請輸入合法的日期（ISO）.",
	number: "請輸入合法的數位",
	digits: "只能輸入整數",
	creditcard: "請輸入合法的信用卡號",
	equalTo: "兩次輸入不相同",
	accept: "請輸入擁有合法后綴名的字串",
	maxlength: jQuery.validator.format("長度不超過 {0}"),
	minlength: jQuery.validator.format("長度不少於 {0}"),
	rangelength: jQuery.validator.format("長度介於 {0} 和 {1} 之間"),
	range: jQuery.validator.format("請輸入一個介於 {0} 和 {1} 之間的值"),
	max: jQuery.validator.format("請輸入一個最大為 {0} 的值"),
	min: jQuery.validator.format("請輸入一個最小為 {0} 的值")
});

/**
 * 验证扩展
 * 
 * 
 */
//ip
jQuery.validator.addMethod("ip", function(value, element) {  
    return this.optional(element) || (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(value) && (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256));  
  }, "請填寫正確的IP地址"); 
//验证密码  4-12位
jQuery.validator.addMethod("password", function(value, element) {  
    return this.optional(element) || (/^\w+$/.test(value));
  }, "請正確填寫密碼（英文字母，數位）");

 //验证编号  1-5位
jQuery.validator.addMethod("identifier", function(value, element) {  
    return this.optional(element) || (/^\w+$/.test(value));
  }, "請正確填寫（英文字母，數位）");
 
  
//中文 
jQuery.validator.addMethod("chineseword", function(value, element) {  
    return this.optional(element) || (/^[\u4e00-\u9fa5]+$/.test(value));
  }, "請填寫正確的中文");

//中文英文
jQuery.validator.addMethod("word", function(value, element) {  
    return this.optional(element) || (/^[\u4e00-\u9fa5|a-z|A-Z\|\s]+$/.test(value));
  }, "請填寫正確的中文或英文");
  
  
$.validator.addMethod("customregex", function(value, element, regex){
	return this.optional(element) || regex.test(value);
}, "Please specify a valid data.");
//验证原密码与新密码是否相同
$.validator.addMethod("noequalTo", function(value, element, param){
	return this.optional(element) || ($(param).val()!=value);
}, "不允許相同");

//是否手机
$.validator.addMethod("isMobile", function(value, element) {
	return this.optional(element) || (/^\d{10,11}$/.test(value));
}, "請正確填寫您的手機號碼");


jQuery.validator.addMethod("vcode", function(value, element,param) {
    return this.optional(element) || (value.length==param);
  }, "請輸入{0}長度的字元");

//保留两位数的小数点
jQuery.validator.addMethod("floatnum", function(value, element) {  
    return this.optional(element) || (/^([1-9]\d*|0)(\.\d{1,2})?$/.test(value));
  }, "只能輸入數位，並且只保留小數點後兩位");

  //后面的值必须大于前面的值
jQuery.validator.addMethod("maxnunber", function(value, element ,smalval) {
	value = Number(value);
	var smalvalue = $(smalval).val();
  	smalvalue = Number(smalvalue);
	return value>smalvalue;
  }, "後面的值必須大於前面的值!");  
  
//验证正整数
jQuery.validator.addMethod("positiveinteger", function(value, element) {
	   var aint=parseInt(value);	
	    return aint>0&& (aint+"")==value;   
	  }, "請輸入正整數");  

//验证被60整除
jQuery.validator.addMethod("timeinterval", function(value, element) {
		var res = 60/value;
		var re = /^[0-9]*[1-9][0-9]*$/ ;
		return re.test(res);
	  }, "只能輸入能被60整除的數");  

//正常的字符串
jQuery.validator.addMethod("normal", function(value, element) {  
	return this.optional(element) || (/^\w+$/.test(value));
  }, "請輸入正常的字元");

//大于
jQuery.validator.addMethod("biggerthan", function(value, element ,smalval) {  
  var smalldata = $(smalval).val();
  	
	return value>smalldata;
  }, "結束時間不能小於開始時間");
  

//十六进制的颜色
jQuery.validator.addMethod("color", function(value, element) {  
    return this.optional(element) || (/^#[0-9a-fA-F]{6}$/.test(value));
  }, "只能輸入十六進位表示顏色");

//坐标
jQuery.validator.addMethod("coordinate", function(value, element) {  
    return this.optional(element) || (/^[\d|.]+\,[\d|.]+$/.test(value));
  }, "請輸入正確座標X,Y");
/**
 * 表单验证 jquery.validate插件   扩展
 * 
 */
//错误提示  中文格式
jQuery.extend(jQuery.validator.messages, {
	required: "必填",
	//remote: "请正确填写",
	email: "请输入正确格式的电子邮件",
	url: "请输入合法的网址",
	date: "请输入合法的日期",
	dateISO: "请输入合法的日期 (ISO).",
	number: "请输入合法的数字",
	digits: "只能输入整数",
	creditcard: "请输入合法的信用卡号",
	equalTo: "两次输入不相同",
	accept: "请输入拥有合法后缀名的字符串",
	maxlength: jQuery.validator.format("长度不超过 {0}"),
	minlength: jQuery.validator.format("长度不少于 {0}"),
	rangelength: jQuery.validator.format("长度介于 {0} 和 {1} 之间"),
	range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
	max: jQuery.validator.format("请输入一个最大为 {0} 的值"),
	min: jQuery.validator.format("请输入一个最小为 {0} 的值")
});

/**
 * 验证扩展
 * 
 * 
 */
//ip
jQuery.validator.addMethod("ip", function(value, element) {  
    return this.optional(element) || (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(value) && (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256));  
  }, "请填写正确的IP地址"); 
//验证密码  4-12位
jQuery.validator.addMethod("password", function(value, element) {  
    return this.optional(element) || (/^\w+$/.test(value));
  }, "请正确填写密码（英文字母，数字）");

 //验证编号  1-5位
jQuery.validator.addMethod("identifier", function(value, element) {  
    return this.optional(element) || (/^\w+$/.test(value));
  }, "请正确填写（英文字母，数字）");
 
  
//中文 
jQuery.validator.addMethod("chineseword", function(value, element) {  
    return this.optional(element) || (/^[\u4e00-\u9fa5]+$/.test(value));
  }, "请填写正确的中文");

//中文英文
jQuery.validator.addMethod("word", function(value, element) {  
    return this.optional(element) || (/^[\u4e00-\u9fa5|a-z|A-Z\|\s]+$/.test(value));
  }, "请填写正确的中文或英文");
  
  
$.validator.addMethod("customregex", function(value, element, regex){
	return this.optional(element) || regex.test(value);
}, "Please specify a valid data.");
//验证原密码与新密码是否相同
$.validator.addMethod("noequalTo", function(value, element, param){
	return this.optional(element) || ($(param).val()!=value);
}, "不允许相同");

//是否手机
$.validator.addMethod("isMobile", function(value, element) {
	return this.optional(element) || (/^\d{10,11}$/.test(value));
}, "请正确填写您的手机号码");


jQuery.validator.addMethod("vcode", function(value, element,param) {
    return this.optional(element) || (value.length==param);
  }, "请输入{0}长度的字符");

//保留两位数的小数点
jQuery.validator.addMethod("floatnum", function(value, element) {  
    return this.optional(element) || (/^([1-9]\d*|0)(\.\d{1,2})?$/.test(value));
  }, "只能输入数字，并且只保留小数点后两位");

  //后面的值必须大于前面的值
jQuery.validator.addMethod("maxnunber", function(value, element ,smalval) {
	value = Number(value);
	var smalvalue = $(smalval).val();
  	smalvalue = Number(smalvalue);
	return value>smalvalue;
  }, "后面的值必须大于前面的值!");  
  
//验证正整数
jQuery.validator.addMethod("positiveinteger", function(value, element) {
	   var aint=parseInt(value);	
	    return aint>0&& (aint+"")==value;   
	  }, "请输入正整数");  

//验证被60整除
jQuery.validator.addMethod("timeinterval", function(value, element) {
		var res = 60/value;
		var re = /^[0-9]*[1-9][0-9]*$/ ;
		return re.test(res);
	  }, "只能输入能被60整除的数");  

//正常的字符串
jQuery.validator.addMethod("normal", function(value, element) {  
	return this.optional(element) || (/^\w+$/.test(value));
  }, "请输入正常的字符");

//大于
jQuery.validator.addMethod("biggerthan", function(value, element ,smalval) {  
  var smalldata = $(smalval).val();
  	
	return value>smalldata;
  }, "结束时间不能小于开始时间");
  

//十六进制的颜色
jQuery.validator.addMethod("color", function(value, element) {  
    return this.optional(element) || (/^#[0-9a-fA-F]{6}$/.test(value));
  }, "只能输入十六进制表示颜色");

//坐标
jQuery.validator.addMethod("coordinate", function(value, element) {  
    return this.optional(element) || (/^[\d|.]+\,[\d|.]+$/.test(value));
  }, "请输入正确坐标X,Y");
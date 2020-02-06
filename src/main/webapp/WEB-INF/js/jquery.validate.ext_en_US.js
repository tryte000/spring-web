/**
 * 表单验证 jquery.validate插件   扩展
 * 
 */
//错误提示  英文格式
jQuery.extend(jQuery.validator.messages, {
	required: "Required",
	//remote: "请正确填写",
	email: "Please enter the correct email format",
	url: "Please enter the legal address",
	date: "Please enter the date on which the legal",
	dateISO: "Please enter the date on which the legal (ISO).",
	number: "Please enter the legitimate number",
	digits: "Can only enter an integer",
	creditcard: "Please enter the legitimate credit card number",
	equalTo: "Two different input",
	accept: "Please enter a string with a legitimate suffix",
	maxlength: jQuery.validator.format("Length is less than {0}"),
	minlength: jQuery.validator.format("The length of not less than {0}"),
	rangelength: jQuery.validator.format("The length between {0} and {1}"),
	range: jQuery.validator.format("Please enter a between {0} and {1}"),
	max: jQuery.validator.format("Please enter a maximum value of the {0}"),
	min: jQuery.validator.format("Please enter a minimum value for {0}")
});

/**
 * 验证扩展
 * 
 * 
 */
//ip
jQuery.validator.addMethod("ip", function(value, element) {  
    return this.optional(element) || (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(value) && (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256));  
  }, "Please fill in the correct IP address"); 
//验证密码  4-12位
jQuery.validator.addMethod("password", function(value, element) {  
    return this.optional(element) || (/^\w+$/.test(value));
  }, "Please fill in the correct password (English letters and Numbers)");

 //验证编号  1-5位
jQuery.validator.addMethod("identifier", function(value, element) {  
    return this.optional(element) || (/^\w+$/.test(value));
  }, "Please fill in the right (English letters and Numbers)");
 
  
//中文 
jQuery.validator.addMethod("chineseword", function(value, element) {  
    return this.optional(element) || (/^[\u4e00-\u9fa5]+$/.test(value));
  }, "Please fill in the correct Chinese");

//中文英文
jQuery.validator.addMethod("word", function(value, element) {  
    return this.optional(element) || (/^[\u4e00-\u9fa5|a-z|A-Z\|\s]+$/.test(value));
  }, "Please fill in the correct in Chinese or English");
  
  
$.validator.addMethod("customregex", function(value, element, regex){
	return this.optional(element) || regex.test(value);
}, "Please specify a valid data.");
//验证原密码与新密码是否相同
$.validator.addMethod("noequalTo", function(value, element, param){
	return this.optional(element) || ($(param).val()!=value);
}, "Do not allow the same");

//是否手机
$.validator.addMethod("isMobile", function(value, element) {
	return this.optional(element) || (/^\d{10,11}$/.test(value));
}, "Please fill in your correct phone number");


jQuery.validator.addMethod("vcode", function(value, element,param) {
    return this.optional(element) || (value.length==param);
  }, "Please input the length of the {0} characters");

//保留两位数的小数点
jQuery.validator.addMethod("floatnum", function(value, element) {  
    return this.optional(element) || (/^([1-9]\d*|0)(\.\d{1,2})?$/.test(value));
  }, "Can only enter the Numbers, and only keep two decimal places");

  //后面的值必须大于前面的值
jQuery.validator.addMethod("maxnunber", function(value, element ,smalval) {
	value = Number(value);
	var smalvalue = $(smalval).val();
  	smalvalue = Number(smalvalue);
	return value>smalvalue;
  }, "At the back of the value must be greater than the front!");  
  
//验证正整数
jQuery.validator.addMethod("positiveinteger", function(value, element) {
	   var aint=parseInt(value);	
	    return aint>0&& (aint+"")==value;   
	  }, "Please enter a positive integer");  

//验证被60整除
jQuery.validator.addMethod("timeinterval", function(value, element) {
		var res = 60/value;
		var re = /^[0-9]*[1-9][0-9]*$/ ;
		return re.test(res);
	  }, "Can only input can be divided exactly by 60");  

//正常的字符串
jQuery.validator.addMethod("normal", function(value, element) {  
	return this.optional(element) || (/^\w+$/.test(value));
  }, "Please enter the normal character");

//大于
jQuery.validator.addMethod("biggerthan", function(value, element ,smalval) {  
  var smalldata = $(smalval).val();
  	
	return value>smalldata;
  }, "End time is not less than start time");
  

//十六进制的颜色
jQuery.validator.addMethod("color", function(value, element) {  
    return this.optional(element) || (/^#[0-9a-fA-F]{6}$/.test(value));
  }, "Can only enter the hex said color");

//坐标
jQuery.validator.addMethod("coordinate", function(value, element) {  
    return this.optional(element) || (/^[\d|.]+\,[\d|.]+$/.test(value));
  }, "Please enter the correct coordinates X, Y");
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
jQuery.validator.addMethod('length', function(value, element, param) {
	return this.optional(element) || (value.length == param);
}, '请输入制定长度字符{0}！');

jQuery.validator.addMethod('baseAdmin_code', function(value, element, param) {
	return this.optional(element) || ((value.length == param[0]) && (value.toLowerCase() == $(param[1]).val().toLowerCase()));
}, '验证码错误！');

jQuery.validator.addMethod('teacherAdmin_code', function(value, element, param) {
	return this.optional(element) || ((value.length == param[0]) && (value.toLowerCase() == $(param[1]).val().toLowerCase()));
}, '验证码错误！');
jQuery.validator.addMethod('teacherAdmin_code', function(value, element, param) {
	return this.optional(element) || ((value.length == param[0]) && (value.toLowerCase() == $(param[1]).val().toLowerCase()));
}, '验证码错误！');

jQuery.validator.addMethod('CsAdmin_code', function(value, element, param) {
	return this.optional(element) || ((value.length == param[0]) && (value.toLowerCase() == $(param[1]).val().toLowerCase()));
}, '验证码错误！');

jQuery.validator.addMethod('schoolAdmin_code', function(value, element, param) {
	return this.optional(element) || ((value.length == param[0]) && (value.toLowerCase() == $(param[1]).val().toLowerCase()));
}, '验证码错误！');
jQuery.validator.addMethod('financeAdmin_code', function(value, element, param) {
    return this.optional(element) || ((value.length == param[0]) && (value.toLowerCase() == $(param[1]).val().toLowerCase()));
}, '验证码错误！');

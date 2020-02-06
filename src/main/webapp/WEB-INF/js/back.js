document.write('<div style="display:none;"><form id="backToOperate" action="" method="post"><input name="isBackOperate" value="1" /></form></div>');
function backToOperate(url) {
	if (typeof(url) == 'undefined')
		url = document.referrer;
	$("#backToOperate").attr('action', url);
	$("#backToOperate").submit();
}
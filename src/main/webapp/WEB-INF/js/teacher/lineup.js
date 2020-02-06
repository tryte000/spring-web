/**
 * 排队操作
 */
function LineUP(obj) {
	//课程id
	this.schedule_id = obj.schedule_id;
	//数据展示界面页面元素
	this.data_show = obj.data_show;
	//添加操作的学号的值所在的input框
	this.add_search = obj.add_search;
	//添加按钮
	this.add_button = obj.add_button;
	//获取数据URL
	this.flush_url = obj.flush_url;
	//添加学生URL
	this.add_url = obj.add_url;
	//修改排序URL
	this.edit_url = obj.edit_url;
	//踢出排队URL
	this.del_url = obj.del_url;
	//获取学生URL
	this.student_url = obj.student_url;
	//排队人数显示块
	this.line_num = obj.line_num;
	//刷新数据
	this.flushData();
	//初始化绑定事件
	this.initBind();
}

LineUP.prototype.initBind = function() {
	//上移排队顺序
	$(this.data_show).on("click", ".sort_img_up", {"_this" : this, "direction":"up"}, this.editSort);
	//下移排队顺序
	$(this.data_show).on("click", ".sort_img_down", {"_this" : this, "direction":"down"}, this.editSort);
	//踢出排队
	$(this.data_show).on("click", ".delLine", {"_this" : this}, this.delLine);
	//绑定select2
	$(this.add_search).select2({
		language: "zh-CN",
		tags: false,
		placeholder: '请输入学生学号或姓名',
		ajax: {
			url: this.student_url,
			dataType: 'json',
			delay: 250,
			data: function (params) {
			 	var param = {student:params.term};
				return param;
			},
			processResults: function (data, params) {
				var result = [];
				$.each(data.data,function(k,v){
					result.push({id:v.id,text:v.name});
				});
				return {
					results:result
				};
			}
		},
		minimumInputLength: 1,
		multiple: false
	});
	//点击添加按钮
	$(this.add_button).bind('click', {"_this" : this}, this.addStudent);
}

LineUP.prototype.flushData = function() {
	var _this = this;
	$.post(this.flush_url,{'scheduleid':this.schedule_id},function(data) {
		if(data.status != 1) {
			return ;
		}
		$(_this.data_show).html('');
		var th = '<tr>'				
		+ '<th>序号</th>'
		+ '<th>学生姓名</th>'
		+ '<th>排序</th>'
		+ '<th>移除队列</th>'
		+ '</tr>';
		$(_this.data_show).append(th);
		$.each(data.data, function(index, value) {
			var str = "";
			str += '<tr>'
			+ '<td><span>' + parseInt(index + 1) + '</span></td>'
			+ '<td><span>' + value.name + '（'+ value.studentId +'）</span></td>'
			+ '<td><div class="sort_img_up" line_id="'+ value.id +'"></div><div class="sort_img_down" line_id="'+ value.id +'"></div></td>'
			+ '<td><i class="glyphicon glyphicon-remove icon_right delLine" line_id="'+ value.id +'"></i></td>'
			+ '</tr>';
			$(_this.data_show).append(str);
		});
		$(_this.line_num).html(data.data.length);
	},'json');
}

LineUP.prototype.addStudent = function(event) {
	var _this = event.data._this;
	var studentId = $(_this.add_search).val();
	if(!/[1-9]+\d*/.test(studentId)) {
		layer.alert('请选择学生！');
		return ;
	}
	$.post(_this.add_url,{'scheduleId':_this.schedule_id, 'studentId':studentId},function(data) {
		if(data.status != 1) {
			layer.alert(data.msg);
			return ;
		}
		$(_this.add_sort).val('');
		$(_this.add_search).val('');
		$("#select2-"+_this.add_search.substr(1)+"-container").attr("title","");
		$("#select2-"+_this.add_search.substr(1)+"-container").html('<span class="select2-selection__placeholder">请输入学生学号或姓名</span>');
		_this.flushData();
	},'json');
}

LineUP.prototype.editSort = function(event) {
	var _this = event.data._this;
	var direction = event.data.direction;
	var line_id = $(this).attr('line_id');
	var index = 0;
	var line_arr = new Array();
	
	// 获取所有排队数据
	$(_this.data_show).find('.delLine').each(function(i, ele) {
		var lineId = $(ele).attr('line_id');
		if(lineId == line_id) {
			index = i;
		}
		line_arr.push(lineId);
	});

	// 排序
	if(direction == 'up') {
		var replace = index - 1;
		console.log(replace);
		if(replace < 0) {
			return ;
		}
		var tmp = 0;
		tmp = line_arr[replace];
		line_arr[replace] = line_arr[index];
		line_arr[index] = tmp;
	} else {
		var replace = index + 1;
		if(replace > (line_arr.length - 1)) {
			return ;
		}
		var tmp = 0;
		tmp = line_arr[replace];
		line_arr[replace] = line_arr[index];
		line_arr[index] = tmp;
	}
	$.post(_this.edit_url,{'line_arr':line_arr},function(data) {
		if(data.status != 1) {
			return ;
		}
		_this.flushData();
	},'json');
}

LineUP.prototype.delLine = function(event) {
	var _this = event.data._this;
	//获取排队id
	var line_id = $(this).attr("line_id");
	var sort = $(this).val();
	$.post(_this.del_url,{'line_id':line_id},function(data) {
		if(data.status != 1) {
			return ;
		}
		_this.flushData();
	},'json');
}

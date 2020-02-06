(function ($){
	$.fn.muiltselect = function(opt){
		if (!opt) opt = {};
		var obj = $(this);
		var msboxes = {
			box:null,
			searchbox:null,
			confirmbox:null,
			listbox:null,
			checkedbox:null,
		};
		opt = $.extend(true,{
			boxid:'multi-select',
			searchboxid:'searchbtn',
			applybtn:'applybtn',
			listid:'listbox',
			ajaxurl:'',
			param:function(){return {};},
			getmsboxes:function(){return msboxes;},
			show:function(){
				msboxes.box.css("top",(obj.offset().top-20));
				msboxes.box.css("left",(obj.offset().left-75));
				msboxes.box.show();

				opt.onLoadData();

				msboxes.searchbox.unbind().click(function(){
					//赋值已选中table 到对应元素的属性
					if(checkedTableId){
						var html = $(checkedTableId).html();
						if(typeof(html)!="undefined"){
							$(objId).attr('checkedTable',html);
						}
					}
					if(opt.ajaxurl==''){
							return false;
					}
					opt.onLoadData();
				});

				msboxes.applybtn.unbind().click(function(){
						msboxes.box.hide();
						opt.onApply();
				});
			},
			onShow:function(){ return true;},
			onLoadData:function(){
				msboxes.box.find('table').hide();
				msboxes.listbox.show();
				//console.log(msboxes.listbox,1);
				if(msboxes.listbox ==''){
					$(".checked-div").hide();
				}else{
					$(".checked-div").show();
					$('#checked-'+msboxes.listbox.attr('id')).find('tr').not('tr:first').remove();
					$('#checked-'+msboxes.listbox.attr('id')).show();
				}

				msboxes.box.find("#loading").remove();
				msboxes.listbox.before("<div id='loading' style='text-align:center;'>加载中...</div>");
				$.post(opt.ajaxurl,opt.param(),function(data){
					msboxes.box.find("#loading").remove();
					opt.onFreshList(opt.onLoaded(data));
				});
				return true;
			},
			onLoaded:function(data){

				return data;
			},
			onApply:function(){

			},
			onFreshList:function(data){

			}

		},opt);

		msboxes.box=$("#"+opt.boxid);
		msboxes.searchbox=msboxes.box.find("#"+opt.searchboxid);
		msboxes.applybtn=$("#"+opt.applybtn);
		msboxes.listbox=$("#"+opt.listid);
		if(msboxes.box.length==0){
			return this;
		}

		$(this).data('muiltselect',{

		});
		$(this).click(function(){
			if(msboxes.box.is(':visible')){
				return false;
			}

			if(opt.onShow()){
				opt.show();
			}
		});

		return this;

	};
})(jQuery);
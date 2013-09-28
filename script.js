

alert('eee');

var iPhoneQiang = {
	insertFloating : function () {
		var floatingHTml = '<div class="qFloating"><div class="form-group">\
		    <label for="firstName">名字</label>\
		    <input type="txt" class="form-control" id="qFirstName" placeholder="请输入你的名字">\
		  </div>\
		  <div class="form-group">\
		    <label for="lastName">姓氏</label>\
		    <input type="txt" class="form-control" id="qLastName" placeholder="请输入你的姓氏">\
		  </div>\
		  <div class="form-group">\
		    <label for="email">電郵地址</label>\
		    <input type="email" class="form-control" id="qEmail" placeholder="请输入你的電郵地址">\
		  </div>\
		  <div class="form-group">\
		    <label for="govid">证件号</label>\
		    <input type="text" class="form-control" id="qGovid" placeholder="身份证、通行证都可">\
		  </div>\
		  <div class="form-group">\
		    <label for="govid">电话</label>\
		    <input type="text" class="form-control" id="qPhone" placeholder="电话号码">\
		  </div>\
		  <div class="form-group">\
		    <label for="govid">门店</label>\
		    <select id="qStore">\
		    	<option value="">请选择要抢的店</option>\
		    	<option value="R485">Festival Walk</option>\
		    	<option value="R428">ifc mall</option>\
		    	<option value="R409">Causeway Bay</option>\
		    </select>  </div>\
		   <div class="form-group">\
		    <label for="govid">抢购的数量</label>\
		    <select id="qAmount">\
		    	<option value="">请选择要抢购的数量</option>\
		    	<option value="1">1</option>\
		    	<option value="2">2</option>\
		    </select>\
		  </div>\
		   <div class="form-group">\
		    <label for="govid">抢购的机型</label>\
		    <select id="qSku">\
		    	<option value="">请选择要抢的机型</option>\
		    	<option value="h16">iPhone 5s 16GB 太空灰</option>\
		    	<option value="h32">iPhone 5s 32GB 太空灰</option>\
		    	<option value="h64">iPhone 5s 64GB 太空灰</option>\
		    	<option value="y16">iPhone 5s 16GB 銀色</option>\
		    	<option value="y32">iPhone 5s 32GB 銀色</option>\
		    	<option value="y64">iPhone 5s 64GB 銀色</option>\
		    	<option value="j16">iPhone 5s 16GB 金色</option>\
		    	<option value="j32">iPhone 5s 32GB 金色</option>\
		    	<option value="j64">iPhone 5s 64GB 金色</option>\
		    </select>\
		  </div>\
		  <div class="form-group">\
		    <label for="govid">前往取货的时间</label>\
		    <select id="qTime">\
		    	<option value="">请选择取机时间</option>\
		    	<option value="10">10-11</option>\
		    	<option value="11">11-12</option>\
		    	<option value="12">12-13</option>\
		    	<option value="13">13-14</option>\
		    	<option value="14">14-15</option>\
		    	<option value="15">15-16</option>\
		    	<option value="16">16-17</option>\
		    	<option value="17">17-18</option>\
		    	<option value="18">18-19</option>\
		    	<option value="19">19-20</option>\
		    	<option value="20">20-21</option>\
		    	<option value="21">21-22</option>\
		    </select>\
		  </div><button id="qInfoSubmit" href="##">确定</button></div>';

		$('body').append(floatingHTml);
		this.getLs();
		this.dataSubmit();

	},
	getLs : function(){
		this.isNull('qFirstName',0);
		this.isNull('qLastName',0);
		this.isNull('qEmail',0);
		this.isNull('qGovid',0);
		this.isNull('qPhone',0);
		this.isNull('qStore',1);
		this.isNull('qSku',1);
		this.isNull('qTime',1);
		this.isNull('qAmount',1);
	},
	isNull : function(type,mode){
		if(localStorage.getItem(type) !== null){
			if(mode == 0){
				$('#'+type).val(localStorage.getItem(type));
			}else if(mode == 1){
				var node = $('#'+type);
				var l = node.find('option').length;
				for(var i = 0; i < l; i++){
					if(node.eq(i).val() == localStorage.getItem(type)){
						node.eq(i).attr('selected','selected');
						break;
					}
				}
			}
			
		}
	},
	setVal : function(type){
		localStorage.setItem(type,$('#'+type).val());
	},	
	dataSubmit: function(){
		$('#qInfoSubmit').on('click', function(event) {
			event.preventDefault();
			iPhoneQiang.setVal('qFirstName');
			iPhoneQiang.setVal('qLastName');
			iPhoneQiang.setVal('qEmail');
			iPhoneQiang.setVal('qGovid');
			iPhoneQiang.setVal('qPhone');
			iPhoneQiang.setVal('qStore');
			iPhoneQiang.setVal('qSku');
			iPhoneQiang.setVal('qTime');
			iPhoneQiang.setVal('qAmount');
		});
	},
	init: function(){
		this.insertFloating();
	}




}

iPhoneQiang.init();



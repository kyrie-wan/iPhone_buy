/*
 * 此脚本用于2013年9月20日起，每天早上6点苹果香港官网进行的iPhone5S预订活动
 * 部分代码参考http://item.taobao.com/item.htm?id=35086681528（已购），感谢原作者的智慧结晶及提供了思路！
 * 声明：本人没有通过此脚本获得任何利益，出于分享的精神，为了让更多的果粉提前预约到iPhone5S，重新封装并优化了体验，可配合
Tampermonkey等脚本自动加载插件使用，加载此脚本后进入https://ireservea.apple.com/HK/zh_HK/reserve/iPhone直接体验
 */


function hackRequest(timeSlotId,timeSlotStartTime) {
	var skuData = {
		"h16": {
			"partNumber": 'MF352ZP/A',
			"S_SKU_NAME": "iPhone 5s 16GB 太空灰"
		},
		"h32": {
			"partNumber": 'MF355ZP/A',
			"S_SKU_NAME": "iPhone 5s 32GB 太空灰"
		},
		"h64": {
			"partNumber": 'MF358ZP/A',
			"S_SKU_NAME": "iPhone 5s 64GB 太空灰"
		},
		"y16": {
			"partNumber": 'MF353ZP/A',
			"S_SKU_NAME": "iPhone 5s 16GB 銀色"
		},
		"y32": {
			"partNumber": 'MF356ZP/A',
			"S_SKU_NAME": "iPhone 5s 32GB 銀色"
		},
		"y64": {
			"partNumber": 'MF359ZP/A',
			"S_SKU_NAME": "iPhone 5s 64GB 銀色"
		},
		"j16": {
			"partNumber": 'MF354ZP/A',
			"S_SKU_NAME": "iPhone 5s 16GB 金色"
		},
		"j32": {
			"partNumber": 'MF357ZP/A',
			"S_SKU_NAME": "iPhone 5s 32GB 金色"
		},
		"j64": {
			"partNumber": 'MF360ZP/A',
			"S_SKU_NAME": "iPhone 5s 64GB 金色"
		}
	};
 	var selectedSku = skuData[capacity];
	var partNumber = selectedSku.partNumber;

	var dataString = {
		emailAddress: emailAddress,
		firstName: firstName,
		lastName: lastName,
		phoneNumber: phoneNumber,
		storeNumber: selectedStore,
		partNumber: partNumber,
		pickUpMode: pickupMode,
		timeSlotId: timeSlotId,
		plan: plan,
		productName: 'iPhone 5s',
		quantity: amount,
		govtID: governmentID,
		startTime: timeSlotStartTime
	};

	var captchaAnswer=''; 
	if ($("#captcha")
		.length > 0) {
		dataString.captchaToken = $("#captchaToken")
			.val();
		dataString.captchaAnswer = captchaAnswer;
		dataString.captchaFormat = $("#captchaFormat")
			.val();
	}
	jQuery.ajax({
		type: "POST",
		url: "createPickUp",
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify(dataString)
	})
		.done(function(data) {
		if (data != null) {
			
			if (data.isError) {

				console.log(data.errorMessage)
				if (data.loginRedirectUrl) {
					window.location = data.loginRedirectUrl;
				} else {
					jQuery("#error")
						.show();
					jQuery("#errorMessage")
						.parent()
						.show();
					jQuery("#errorMessage")
						.text(data.errorMessage);
					jQuery("#errMessage")
						.hide();
					jQuery("#errorMessage")
						.show();
				}
			} else {
				jQuery('#productName')
					.val(1 + " " + selectedSku.S_SKU_NAME);
				jQuery('#pickupMode')
					.val(pickupMode);
				jQuery('#pickUpSlot')
					.val(jQuery('.step-seven .selection')
					.html());
				jQuery('#storeName')
					.val(jQuery('.step-one .selection')
					.html());
				jQuery('#pickupDateAndTimeText')
					.val(data.pickupDateAndTimeText);
				jQuery('#storeMapUrl')
					.val(data.storeMapUrl);
				jQuery('#tagName')
					.val(location.href.split('/')[location.href.split('/')
					.length - 2]);
				jQuery('#pickUpForm')
					.submit();

					console.log('请求订单成功,正在转到!!!')
			}
		}
	})
		.fail(function(jqXHR, textStatus, errorThrown) {

			console.log('还没开始!')
		console.error(jqXHR, textStatus, errorThrown);
	})
		.always(function() {});
}

// 重写getTimeslots
function getTimeslots(selectedSubProduct, storeNumber, plan , mode,currentObject) {

	var dataString = 'productName=' + selectedSubProduct + '&storeNumber=' + storeNumber +'&plan='+ plan + '&mode=' + mode;
	jQuery.ajax({
		type: "POST",
		url: "getTimeSlots",
		dataType : "json",
		data: dataString,
		success: function(data) {

			if (data.timeSlots ) {
				jQuery.each(data.timeSlots, function(index, val) {
					if(index==(time-10)){
						var slotid=	val.timeslotID;
						var startTime=val.startTime;
							hackRequest(slotid.toString(),startTime.toString() );
					}
				
				});	
			
			}
		
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log('预订服务器已经关闭了');
			
		} 		
	});
}







//alert('eee');

var iPhoneQiang = {
	insertFloating : function () {
		var floatingHTml = '<style>.qFloating{position: fixed;bottom: 0px;right: 0px;border: #ddd solid 1px;width: 254px;height: 348px;background-color: #fff;z-index: 99999;padding: 20px;}.qFloating label {margin-bottom: 5px;float: left;width: 74px;}.form-group {margin-bottom: 10px;clear:both; }.form-control {display: block;width: 150px;height: 24px;padding: 0px 12px;font-size: 14px;line-height: 1.428571429;color: #555555;vertical-align: middle;background-color: #ffffff;border: 1px solid #cccccc;border-radius: 4px;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);-webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;}.form-control:focus {border-color: #66afe9;outline: 0;-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6);box-shadow: inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6);}</style><div class="qFloating"><div class="form-group">\
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
		  </div>\
		  <div class="form-group"><button id="qInfoSubmit" href="##">确定</button>\
		  </div></div>';

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
		if($('#phoneNumber').length == 1){
			document.querySelector("#phoneNumber").value = localStorage.getItem('qPhone');
		}		

	},
	isNull : function(type,mode){
		if(localStorage.getItem(type) !== null){
			if(mode == 0){
				$('#'+type).val(localStorage.getItem(type));
			}else if(mode == 1){
				var node = $('#'+type);
				var option = node.find('option');
				for(var i = 0; i < option.length; i++){
					//console.log(option.eq(i).val());
					if(option.eq(i).val() == localStorage.getItem(type)){
						option.eq(i).attr('selected','selected');
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
			if($('#phoneNumber').length == 1){
				document.querySelector("#phoneNumber").value = localStorage.getItem('qPhone');
			}
			alert('修改成功！');
		});
	},
	qiang : function(){

		if($('#govid').length == 0){
			console.log('开始抢购.....');
			time =parseInt(localStorage.getItem('qTime'));
			firstName =  localStorage.getItem('qFirstName');
			lastName =   localStorage.getItem('qLastName');	
			emailAddress = localStorage.getItem('qEmail');
			governmentID = localStorage.getItem('qGovid'); 
			phoneNumber = localStorage.getItem('qPhone'); 
			selectedStore= localStorage.getItem('qStore');
			capacity=localStorage.getItem('qSku');
			amount = parseInt(localStorage.getItem('qAmount'));



			pickupMode = 'POST_LAUNCH';
			plan = "UNLOCKED";

			// document.querySelector("#firstname").value = firstName;
			// document.querySelector("#lastname").value = lastName;
			// document.querySelector("#email").value = emailAddress;
			// document.querySelector("#govid").value = governmentID;
			console.log('获取信息完毕，准备发起请求....');
			console.log(firstName,lastName);
			//getTimeslots('iPhone 5s', selectedStore, "UNLOCKED", pickupMode, jQuery(this));

		}

	},

	init: function(){
		this.qiang();
		this.insertFloating();
	}

}

iPhoneQiang.init();



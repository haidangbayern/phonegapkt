
var lottery_draw_tickets = {
	stage: '',
	layer: '',
	background: '',
	//arr_normal_number: new Array(),
	initialize: function(argument) {
        if (typeof time_server != "undefined")
        {
    		//created canvas
    		this.stage = new Kinetic.Stage({
    			container: 'canvas_lottery_ticket',
    			width: 500,
    			height: 550
    		});
    		this.layer = new Kinetic.Layer();
    		this.stage.add(this.layer);
    		//create background ticket
    		this.background = new Kinetic.Image({
    			x: 0,
    			y: 0,
    			image: $('#img_cached').find('img[name=ticket_'+time_server.count_normal_number+']')[0],
    			width: this.stage.getWidth(),
    			height: this.stage.getHeight(),
    		});
    		this.layer.add(this.background);
    		this.stage.draw();
        }
        else
        {
            setTimeout(function(){
                lottery_draw_tickets.initialize();
            }, 300);
        }
	},
	draw_all_tickets: function(obj) {
		for (var i = 0; i < obj.length; i++) {
			this.draw_ticket(obj[i]);
			this.stage.draw();
			this.export_ticket(obj[i].id)
		};
		this.stage.draw();
        //$("a[name=thumnail]").touchGallery();
        $("a[name=thumnail]").swipebox();
//		$("a[name=thumnail]").fancybox({
//			'transitionIn': 'elastic',
//			'transitionOut': 'elastic',
//			'speedIn': 600,
//			'speedOut': 200,
//			'overlayShow': false
//		});
	},
	draw_ticket: function(obj) {
		var obj_info_kin = {
			'normal_number': {
				'x': 65,
				'y': 148,
				'fontSize': 36,
				'fontFamily': 'fake_receipt',
				'color': 'black',
			},
			'power_number': {
				'x': 65,
				'y': 230,
				'fontSize': 36,
				'fontFamily': 'fake_receipt',
				'color': 'red',
			},
			'barcode': {
				'x': 97,
				'y': 530,
                'scaleX' : 1.2,
				'fontSize': 18,
				'fontFamily': 'arial',
				'color': 'black',
			},
			'lottery_time': {
				'x': 110,
				'y': 358,
				'fontSize': 24,
				'fontFamily': 'fake_receipt',
				'color': 'black',
			},
			'purchase_time': {
				'x': 210,
				'y': 64,
				'fontSize': 14,
				'fontFamily': 'fake_receipt',
				'color': 'black',
			}
		};
		this.draw_number(obj.normal_number, "normal_number", obj_info_kin);
		this.draw_number(obj.power_number, "power_number", obj_info_kin);
		var barcode = "LOTTERY - ";
		var normal_number = obj.normal_number.replace(/\|/g, " ");
		barcode += normal_number + " - ";
		var power_number = obj.power_number.replace(/\|/g, " ");
		barcode += power_number;
		this.draw_string(barcode, 'barcode', obj_info_kin);
		this.draw_string(obj.lottery_time, 'lottery_time', obj_info_kin);
		this.draw_string(obj.purchase_time, 'purchase_time', obj_info_kin);
		this.stage.draw();
	},
	draw_number: function(numbers, type_number, obj_info_kin) {
		if (this.stage.find('.' + type_number).length == 0) {
			numbers = numbers.split('|');
			for (var i = 0; i < numbers.length - 1; i++) {
				var number = numbers[i];
				var obj_number = new Kinetic.Text({
					id: type_number + '_' + i,
					name: type_number,
					x: obj_info_kin[type_number].x * (i + 1) + (obj_info_kin[type_number].x - 50) * (i),
					y: obj_info_kin[type_number].y,
					text: number,
					fontSize: obj_info_kin[type_number].fontSize,
					fontFamily: obj_info_kin[type_number].fontFamily,
					fill: obj_info_kin[type_number].color,
				});
				//this.arr_normal_number.push(obj_number);
				this.layer.add(obj_number);
			}
		} else {
			numbers = numbers.split('|');
			for (var i = 0; i < numbers.length - 1; i++) {
				var number = numbers[i];
				var obj_number = this.stage.find('#' + type_number + '_' + i)[0];
				obj_number.setText(number);
			}
		}
	},
	draw_string: function(text, type, obj_info_kin) {
		if (this.stage.find('.' + type).length == 0) {
			var obj_barcode = new Kinetic.Text({
				id: type,
				name: type,
				x: obj_info_kin[type].x,
				y: obj_info_kin[type].y,
				text: text,
				fontSize: obj_info_kin[type].fontSize,
				fontFamily: obj_info_kin[type].fontFamily,
				fill: obj_info_kin[type].color,
			});
            if (typeof obj_info_kin[type].scaleX != "undefined")
                obj_barcode.setScaleX(obj_info_kin[type].scaleX);
			this.layer.add(obj_barcode);
		} else {
			var obj_barcode = this.stage.find('#' + type)[0];
			obj_barcode.setText(text);
		}
	},
	export_ticket: function(id) {
			//var img = $($('#items').find('li[name=ticket_' + id + ']')[0]).find('img[name=thumnail]')[0];
//		var img_big = $('#ti_' + id).find('img[name=thumnail]')[0];
        var img = $($('#lottery_tickets *[name=ticket_' + id + ']')[0]).find('img[name=thumnail]')[0];
        //var img_big = $('#ti_' + id).find('img[name=thumnail]')[0];
	
		this.stage.toDataURL({
			mimeType:"image/jpeg",
			callback: function(dataUrl) {
                img.parentElement.href = dataUrl;
				img.src = dataUrl;
				//img_big.src = dataUrl;

				// var data_post = {
				// 	'dataURL': img.src,
				// 	'id': id,
				// };
				// $.ajax({
				// 	url: window.server_url+'/game/mobile_app_lottery/save_image',
				// 	data: data_post,
				// 	type: "POST",
				// 	contentType: "application/json",  
		  //        	dataType: 'jsonp',  
		  //        	crossDomain: true,  
		  //        	error: function(e) {  
			 //           console.log(e.message);  
			 //         },  
			 //         complete: function(data) {  
			 //           console.log(data);  
			 //         } , 
				// 	success: function(data) {}
				// });
			}
		});
	}
}
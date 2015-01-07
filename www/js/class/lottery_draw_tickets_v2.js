var lottery_draw_tickets_v2 = {
    stage: '',
    layer: '',
    background: '',
    obj: {},
    //arr_normal_number: new Array(),
    reset: function()
    {
    	this.stage= '';
    	this.layer= '';
    	this.background= '';
    	this.obj= {};
    },
    initialize: function() {
        if (typeof time_server != "undefined") {
            if (this.stage == '') {
                console.log("draw tickets: initialize stage");
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
                    image: $('#img_cached').find('img[name=ticket_' + time_server.count_normal_number + ']')[0],
                    width: this.stage.getWidth(),
                    height: this.stage.getHeight(),
                });
                this.layer.add(this.background);
                this.stage.draw();
            }
        } else {
            setTimeout(function() {
                lottery_draw_tickets.initialize();
            }, 300);
        }
    },
    draw_ticket: function(obj) {
    	// for (var i = 0; i < obj.normal_ball.length; i++) {
     //        if (obj.normal_ball[i].toString().length < 2) obj.normal_ball[i] = "0" + obj.normal_ball[i];
     //    }
     //    for (var i = 0; i < obj.power_ball.length; i++) {
     //    	if (obj.power_ball[i].toString().length < 2) 
     //        	obj.power_ball[i] = "0" + obj.power_ball[i];
     //    }
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
                'scaleX': 1.2,
                'fontSize': 18,
                'fontFamily': 'arial',
                'color': 'black',
            },
            'lottery_time': {
                'x': 50,
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
        console.log(obj.normal_ball);
        if (typeof obj.normal_ball == "string")
        {
            var number = obj.normal_ball .split("|");
            var realNumber = [];
            for (var j = 0; j < number.length; j++) {
                if (number[j]) 
                    realNumber.push(number[j]);
            };
            obj.normal_ball = realNumber;
        }
        if (typeof obj.power_ball == "string")
        {
            var number = obj.power_ball .split("|");
            var realNumber = [];
            for (var j = 0; j < number.length; j++) {
                if (number[j]) 
                    realNumber.push(number[j]);
            };
            obj.power_ball = realNumber;
        }
        this.draw_number(obj.normal_ball, "normal_number", obj_info_kin);
        this.draw_number(obj.power_ball, "power_number", obj_info_kin);
        var barcode = "LOTTORO - ";
        for (var i = 0; i < obj.normal_ball.length; i++) {
            if (!obj.normal_ball[i])
                continue;
            var t = " - ";
            var number = obj.normal_ball[i];
            if (obj.normal_ball[i].toString().length < 2) 
            	number = "0" + obj.normal_ball[i];
            barcode += number + t;
        }
        for (var i = 0; i < obj.power_ball.length; i++) {
            if (!obj.power_ball[i])
                continue;
            var t = " - ";
            if (i + 1 == obj.power_ball.length) t = "";
            var number = obj.power_ball[i];
            if (obj.power_ball[i].toString().length < 2) 
            	number = "0" + obj.power_ball[i];
            barcode += number + t;
        }
        this.draw_string(barcode, 'barcode', obj_info_kin);
        //2014-06-20 DANG
        this.draw_string(obj.drawing_time + " GMT-06:00", 'lottery_time', obj_info_kin);
        this.draw_string(obj.purchase_time + " GMT-06:00", 'purchase_time', obj_info_kin);
        //END DANG
        //this.draw_string(obj.lottery_time, 'lottery_time', obj_info_kin);
        //this.draw_string(obj.purchase_time, 'purchase_time', obj_info_kin);
        this.stage.draw();
    },
    draw_number: function(numbers, type_number, obj_info_kin) {
        if (this.stage.find('.' + type_number).length == 0) {
            for (var i = 0; i < numbers.length; i++) {
                var number = numbers[i];
                if (!number)
                    continue;
                if (number.toString().length < 2)
                	number = "0" + number;
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
            for (var i = 0; i < numbers.length; i++) {
                var number = numbers[i];
                if (!number)
                    continue;
                if (number.toString().length < 2)
                	number = "0" + number;
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
            if (typeof obj_info_kin[type].scaleX != "undefined") obj_barcode.setScaleX(obj_info_kin[type].scaleX);
            this.layer.add(obj_barcode);
        } else {
            var obj_barcode = this.stage.find('#' + type)[0];
            obj_barcode.setText(text);
        }
    },
    full_screen: function(id) {
        this.stage.toDataURL({
            mimeType: "image/jpeg",
            callback: function(dataUrl) {
                obj_loading.hide();
                // img.parentElement.href = dataUrl;
                // img.src = dataUrl;
                var backdrop = $('div.backdrop');
                backdrop.addClass('visible');
                backdrop.addClass('active');
                backdrop.addClass('backdrop_loading');
                backdrop.addClass('center-middle');
                var avatar = user.avatar;
                avatar = avatar.replace("thumbs/", "");
                var t = "";
                t += '<div width="100%" class="text-center">';
                t += '<img src="' + dataUrl + '" style="width:100%;" />';
                t += '<button class="button button-small button-positive" onClick="closeFullScreenImage()">Close</button>';
                t += '</div>';
                backdrop.html(t)
            }
        });
    }
}

function closeFullScreenImage()
{
	var backdrop = $('div.backdrop');
        backdrop.removeClass('visible');
        backdrop.removeClass('active');
        backdrop.removeClass('backdrop_loading');
        backdrop.removeClass('center-middle');
        backdrop.html("");
}
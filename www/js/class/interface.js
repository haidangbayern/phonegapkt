var obj_interface = {
    is_redesign: false,
    data: {},
    //ok
    analyze_data: function(data) {
        this.is_redesign = true;
        obj_loading.show();
        for (var i = 0; i < data.length; i++) {
            if (data[i]['name'] != 'time_lottery') {
                this.data[data[i]['name']] = data[i]['value'];
            }
            if (data[i]['name'] == 'time_lottery') {
                if (this.data[data[i]['name']] == undefined) this.data[data[i]['name']] = new Array();
                this.data[data[i]['name']].push(data[i]);
            }
        }
        this.data.count_normal_number = Number(this.data.count_normal_number);
        this.data.count_power_number = Number(this.data.count_power_number);
        this.data.count_lottery_date = Number(this.data.count_lottery_date);
        this.data.normal_number_min = Number(this.data.normal_number_min);
        this.data.normal_number_max = Number(this.data.normal_number_max);
        this.data.power_number_min = Number(this.data.power_number_min);
        this.data.power_number_max = Number(this.data.power_number_max);
        this.data.limit_buy_ticket = Number(this.data.limit_buy_ticket);
        
    },
    effect_on_home_page: function() {
        $('.next-drawing .estimated-date').html('At ' + window.store_data.estimated.datetime);
        $('.estimated-toros.ng-binding').animate({
            transform: 'scale(1,0)'
        }, function() {
            $('.next-drawing .estimated-toros').html(window.store_data.estimated.jackpot);
            $('.estimated-toros.ng-binding').animate({
                transform: 'scale(1,1)'
            });
        });
        $('.last-drawing').animate({
            transform: 'scale(1,0)'
        }, function() {
            $('.last-drawing .sub-heading').html(window.store_data.last_drawing.time_text);
            $('.last-drawing .ball-draw').html(window.store_data.last_drawing.balls);
            $('.last-drawing .badge-jackpot').html(window.store_data.last_drawing.jackpot);
            $('.last-drawing').animate({
                transform: 'scale(1,1)'
            });
        });
    },
    html_user_left: function(data) {
        $('#user_left img[name=avatar]').attr('src', data.avatar);
        $('#user_left h2[name=fullname]').text(data.full_name);
        $('#user_left p[name=balance]').text(numeral(data.balance).format('0,0') + " " + window.languages[window.current_language].web_currency + "s");
    },
    next_time_draw: function() {
    	obj = this.data;
        var html = "";
        var time_lottery = obj.time_lottery;
        var is_flag_exsits_datetime = false;
        var time_lottery_title = "";
        for (var iday = 1; iday <= Number(obj.count_lottery_date) && !is_flag_exsits_datetime; iday++) {
            for (var i = 0; i < time_lottery.length && !is_flag_exsits_datetime; i++) {
                var time = time_lottery[i];
                var ti = time["value"].split(":");
                var hour = ti[0];
                var minutes = ti[1];
                var datetime = new Date(time_server.year, Number(time_server.month) - 1, time_server.day, hour, minutes);
                datetime.addDays(iday - 1);
                var current_datetime = new Date(time_server.year, Number(time_server.month - 1), time_server.day, time_server.hour, time_server.minutes);
                if (current_datetime > datetime) break;
                var t = (datetime.getMonth() + 1) + "/" + datetime.getDate() + "/" + datetime.getFullYear() + " " + (datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()) + ":" + (datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes());
                if (window.d == undefined) window.d = datetime;
                var text_datetime = "Buy " + (datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()) + ":" + (datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes()) + " - " + datetime.getMonthName() + " " + datetime.getDate() + ", " + datetime.getFullYear();
                var time_lottery_title = (datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()) + ":" + (datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes()) + " - " + datetime.getMonthName() + " " + datetime.getDate() + ", " + datetime.getFullYear();
                var rep = {
                    text : time_lottery_title,
                    value  : datetime.getMonthName() + " " + datetime.getDate() + ", " + datetime.getFullYear() + " " + (datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()) + ":" + (datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes()),
                };
                return rep;
                is_flag_exsits_datetime = true;
            }
        }
        return null;
    },
};
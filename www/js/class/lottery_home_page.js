var lottery_home_page = {
    data : {},
    initialize : function()
    {
        obj_loading.show();
        console.log("lottery_home_page: initialize");
        this.loading_last_drawing();
    },
    loading_last_drawing: function(){
        $.ajax({
            url: window.server_url+'/game/mobile_app_lottery/request_home_page_data?v=' + window.version,
            data: null,
            contentType: "application/json",  
            dataType: 'jsonp',  
            crossDomain: true,  
            error: function(e) {  
                console.log("lottery_home_page: error");
            },  
             complete: function(data) { 
                console.log("lottery_home_page: complate");
            } , 
            success: function(data) {
                console.log("lottery_home_page: success");

                obj_loading.hide();
                var r = data;
                console.log(r);
                if (r.last_drawing) {

                    //time text
                    var time_text =r.last_drawing.time_lottery.replace(/-/g,'/');
                    var date = new Date(time_text);
                    time_text = date.getMonthName() + " " + date.getDate() + " , " + date.getFullYear() + " - ";

                    if (date.getHours() < 10)
                        time_text += "0" + date.getHours();
                    else
                        time_text += date.getHours();

                    time_text += ":";

                    if (date.getMinutes() < 10)
                        time_text += "0" + date.getMinutes();
                    else
                        time_text += date.getMinutes();

                    $('.last-drawing .sub-heading').html("Last drawing: " + time_text );

                    // Ball
                    var html = "";
                    
                    var normal = r.last_drawing.normal_number;
                    normal = normal.split("|");
                    for(var i=0; i<normal.length-1; i++)
                        html += '<span class="ball ball-30">'+ normal[i] +'</span> ';

                    var power = r.last_drawing.power_number;
                    power = power.split("|");
                    for(var i=0; i<power.length-1; i++)
                        html += '<span class="ball ball-30 power-ball">'+ power[i] +'</span> ';

                    $('.last-drawing .ball-draw').html(html);

                    //Awards
                    $('.last-drawing .jackpot').html('<span class="badge badge-jackpot">'+ r.jackpot +'</span>');
                    

                    $('.last-drawing').show();
                    
                } else {
                    $('.last-drawing').hide();
                }
            }
        });
    }
};

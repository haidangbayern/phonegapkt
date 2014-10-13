var app_home_page = {
    data : {},
    // initialize : function()
    // {
    //     var backdrop = $('div.backdrop');
    //     backdrop.addClass('visible');
    //     backdrop.addClass('active');
    //     backdrop.addClass('backdrop_loading');
        
    //     $('body').addClass('menu-open');
    //     $('body').addClass('popup-open');

    //     var t = "<div class='home_load popup popup-showing active'>";
    //     t += '<div class="popup-head" style="padding-bottom:0;">';
    //     t += '<img src=\'images/logo_kootoro.png\' style="width:100%;" />';
    //     t += '</div>';
    //     t += '<div class="popup-body" style="padding:0;">';
    //     t += '<h1 class="text-center" id=\'animated_loading\' >';
    //     t += '<span> Connect To Server ... </span>';
    //     t += '</h1>';
    //     t += "</div>";
    //     t += "<div class=\"text-center\"> version " + window.version_application + "</div></div>";
    //     backdrop.after(t)    

    //     console.log("app_home_page: initialize");
    // },
    change_app_status : function(text){
        $('#animated_loading span').html(text);
    },
    // off_app_status : function()
    // {
    //     $('.backdrop').removeClass('backdrop_loading');
    //     $('.backdrop').removeClass('visible');
    //     $('.backdrop').removeClass('active');
    //     $('.home_load').remove();
    // },
    call_server_get_data: function(is_first_load){
        window.is_first_load = is_first_load;
        if (typeof window.is_first_load != "undefined")
            this.change_app_status("Getting Data");

        //get data from database
        // obj_db.runQuery();
        // if (obj_db.data_result != null && obj_db.data_result.rows.length != 0)
        // {
        //     console.log("app_home_page: get From database");
        //     var sponsors = [];
        //     for (var i=0; i < obj_db.data_result.rows.length; i++)
        //     {
        //         sponsors.push({
        //             'id' : obj_db.data_result.rows.item(i).id,
        //             'image' : obj_db.data_result.rows.item(i).image,
        //         });
        //     }
        //     window.store_data.sponsors = sponsors;

        //     if (typeof window.is_first_load != "undefined"){
        //         app_home_page.off_app_status();
        //         window.location.href = "#/app/lottery";    
        //     }
            
        // }
        // else
        // {
            console.log("app_home_page: get From Ajax");
            $.ajax({
                url: window.server_url+'/game/mobile_app_lottery/request_home_page_data?v=' + window.version,
                data: null,
                type: "POST",
                dataType: 'json',  
                // contentType: "application/json",  
                // dataType: 'jsonp',  
                crossDomain: true,  
                error: function(e) {  
                    console.log("app_home_page: error");
                },  
                complete: function(data) { 
                    console.log("app_home_page: complate");
                }, 
                success: function(data) {
                    
                    obj_countries.setData(data.countries);
                    obj_states.setData(data.states);
                    
                    console.log("app_home_page: success");

                    //******************* Sponsors
                    //create tables
                    var first_run = window.localStorage.getItem("runned");
                    if ( first_run == null ) {
                        window.localStorage.setItem("runned", "1");
                        obj_db.is_resetDatabase = true;
                        obj_db.runCreateTables();
                    } 

                    //insert data to database
                    var r_sponsors = data.sponsors;
                    var sponsors = [];
                    obj_db.data = [];
                    for(var i=0; i<r_sponsors.length; i++)
                    {
                        obj_db.data[i] = {
                            'id' : r_sponsors[i].id,
                            'image' : r_sponsors[i].image,
                        };
                        sponsors.push({
                            'id' : r_sponsors[i].id,
                            'image' : r_sponsors[i].image,
                            'url' : r_sponsors[i].url_address,
                        });
                    }
                    window.store_data.sponsors = sponsors;
                    obj_db.runInsertDB();

                    //********************** Last drawing
                    if (data.last_drawing) {

                        //time text
                        var time_text =data.last_drawing.time_lottery.replace(/-/g,'/');
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
                        time_text = window.languages[window.current_language].last_drawing+": " + time_text;
                        //$('.last-drawing .sub-heading').html("Last drawing: " + time_text );

                        // Ball
                        var html = "";
                        
                        var normal = data.last_drawing.normal_number;
                        normal = normal.split("|");
                        for(var i=0; i<normal.length-1; i++)
                            html += '<span class="ball ball-30">'+ normal[i] +'</span> ';

                        var power = data.last_drawing.power_number;
                        power = power.split("|");
                        for(var i=0; i<power.length-1; i++)
                            html += '<span class="ball ball-30 power-ball">'+ power[i] +'</span> ';

                        //$('.last-drawing .ball-draw').html(html);

                        //Awards
                        //$('.last-drawing .jackpot').html('<span class="badge badge-jackpot">'+ r.jackpot +'</span>');
                        window.store_data.last_drawing = {
                            'time_text' : time_text,
                            'balls' : html,
                            'jackpot' : data.jackpot +"s",
                        };

                        window.store_data.estimated = data.estimated;
                    } else {
                        
                    }
                    //change interface
                    if (window.page_name == "app_lottery_main")
                    {
                        obj_interface.effect_on_home_page();
                    }

                    //redirect to app/lottery
                    if (typeof window.is_first_load != "undefined"){
                        //app_home_page.off_app_status();
                        //window.location.href = "#/app/lottery";
                        //HUY - begin 2014-09-25 
                        //$('ion-content').remove();
                        $('ion-content').empty();
                        window.location.href = "#/login";
                        //window.login();
                        //HUY - end 2014-09-25 
                        // $('body').removeClass('popup-open');
                        // $('body').removeClass('menu-open');
                    }
                }
            });
        //}
    },
    
};

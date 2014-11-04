var obj_keyboard = {
    "time": 100,
    "is_show": false,
    "number_of_times": 5,
    "keyboardHeight" : 0,
    "scroll_height_case_no_keyboard" : null,
    "has_scroll_screen" : false,
    //"scroll_maxtrix" : null,

    keyboardShowHandler: function(e) {
        if (e.keyboardHeight > 0) obj_keyboard.is_show = true;
        else obj_keyboard.is_show = false;
        obj_keyboard.keyboardHeight = e.keyboardHeight;
        dev_log.console_log(e.keyboardHeight);
    },
    scroll_keyboard_up : function(element_offset, element, ionicScrollDelegate)
    {
        console.log(obj_keyboard.has_scroll_screen);
        //setTimeout(function(){
           if (obj_keyboard.is_show && window.keyboard_disableScroll
            && !obj_keyboard.has_scroll_screen
            && (element.attr('type') == 'text' 
                || element.attr('type') == 'email'
                || element.attr('type') == 'number'
                || element.attr('type') == 'password'
                || element.attr('type') == 'search'
                || element.attr('type') == 'tel'
                || element.attr('type') == 'url'
                ))
            {
                //Setting with new height
                var padding = 15;
                var new_height = $(window).height() - obj_keyboard.keyboardHeight;
                var ion_content = $('ion-content');
                var scroll = $('ion-content > .scroll');
                var ion_view = $('ion-view');
                var ion_footer_bars = $('ion-footer-bar');
                new_height += padding;

                for (var i = 0; i< ion_footer_bars.length; i++)
                {
                    var has_element = ion_footer_bars.eq(i).find(element);
                    if (has_element.length)
                    {
                        var new_bottom = obj_keyboard.keyboardHeight;
                        new_bottom += padding;

                        new_height -= ion_footer_bars.eq(i).height();

                        ion_footer_bars.eq(i).css('bottom', new_bottom + "px");
                    }
                    else
                    {
                        ion_footer_bars.eq(i).hide();
                    }
                }

                ion_content.css('height', new_height + 'px');
                scroll.css('height', new_height + 'px');
                ion_view.css('height', new_height + 'px');

                //Scrolling
                // if (ionicPosition.offset(element).top < new_height)
                // {
                //     obj_keyboard.has_scroll_screen = false;
                // }
                // else
                // {
                //     if (device.model == "laptop")
                //     {
                //         var parent = $(element).offsetParent();
                //         ionicScrollDelegate.scrollTo(0, parent.position().top);    
                //         obj_keyboard.has_scroll_screen = true;
                //     }
                //     else
                //     {
                //         obj_keyboard.has_scroll_screen = false;
                //     }
                    
                // }
                setTimeout(function(){
                    $(element).focus();
                },100)
            }
        //}, 100);
    },
    scroll_keyboard_down: function(element_offset, element,ionicScrollDelegate)
    {
        setTimeout(function(){
            if (!obj_keyboard.is_show && window.keyboard_disableScroll)
            {
                //Setting with new height
                var new_height = $(window).height() - obj_keyboard.keyboardHeight;
                var ion_content = $('ion-content');
                var scroll = $('ion-content > .scroll');
                var ion_view = $('ion-view');
                var ion_footer_bars = $('ion-footer-bar');

                ion_content.css('height', 'auto');
                scroll.css('height', 'auto');
                ion_view.css('height', 'auto');

                ion_footer_bars.css('bottom', "0");
                ion_footer_bars.show();
                //Scrolling
                // if (element && obj_keyboard.has_scroll_screen)
                // {
                //     var parent = $(element).offsetParent();
                //     ionicScrollDelegate.scrollTo(0, parent.position().top);
                // }
                obj_keyboard.has_scroll_screen = false;
            }
        },500);
    },
    keyboardHideHandler: function(e) {
        obj_keyboard.is_show = false;
        obj_keyboard.scroll_height_case_no_keyboard = null;
        //obj_keyboard.scroll_keyboard_down();
    },
    open: function()
    {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            obj_keyboard.is_show = true;            
            cordova.plugins.Keyboard.show();
        }
    },
    waitForClose: function() {

        if (obj_keyboard.is_show || obj_keyboard.number_of_times == 0) {
        	obj_keyboard.number_of_times = 5;
            obj_keyboard.close();
        } else {
        	obj_keyboard.number_of_times--;
            setTimeout(function() {
                if (!obj_keyboard.is_show) {
                    obj_keyboard.waitForClose();
                }
                else
                {
                	obj_keyboard.close();
                }
            }, obj_keyboard.time);
        }
    },
    close: function() {
        setTimeout(function(){
            if (obj_keyboard.is_show)
            {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    obj_keyboard.is_show = false;
                    obj_keyboard.number_of_times = 5;
                    cordova.plugins.Keyboard.close();
                }
            }
        },500);
    }
};
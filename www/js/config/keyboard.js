var obj_keyboard = {
    "time": 100,
    "is_show": false,
    "number_of_times": 5,
    keyboardShowHandler: function(e) {
        if (e.keyboardHeight > 0) obj_keyboard.is_show = true;
        else obj_keyboard.is_show = false;
        // if ($('ion-nav-view > ion-content').length > 0)
        //     $('ion-nav-view > ion-content').height($(window).height()-e.keyboardHeight);
        // else
        //     $('ion-nav-view > ion-content').height($(window).height());   
        
        // if ($('ion-nav-view > ion-side-menus').length > 0)
        //     $('ion-nav-view > ion-side-menus').height($(window).height()-e.keyboardHeight);
        // else
        //     $('ion-nav-view > ion-side-menus').height($(window).height());   
    },
    keyboardHideHandler: function(e) {
        obj_keyboard.is_show = false;
        // $('ion-nav-view > ion-content').height($(window).height());   
        // $('ion-nav-view > ion-side-menus').height($(window).height());   
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
        if (window.cordova && window.cordova.plugins.Keyboard) {
            obj_keyboard.is_show = false;
            obj_keyboard.number_of_times = 5;
            cordova.plugins.Keyboard.close();
        }
    }
};
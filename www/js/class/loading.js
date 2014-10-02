var obj_loading = {
    element: null,
    is_show: false,
    set: function(obj) {
        this.element = obj;
    },
    get: function() {
        return this.element;
    },
    toggle: function(is_show) {
        if (is_show != undefined) this.is_show = is_show;
        else this.is_show = this.is_show ? false : true;
        if (this.is_show) this.show();
        else this.hide();
    },
    show: function(message) {
        if (message == undefined) message = "";
        else message = " " + message;
        if (this.is_show) {
            $('#block_message').text(message);
            return;
        }
        this.is_show = true;
        $.blockUI({
            message: "<h1 style='margin-top:10px;'><i class='icon ion-loading-a'></i><span id='block_message' style=\"font-size:16px;position: relative;top: -7px;\">" + message + "</span></h1>",
            overlayCSS: {
                backgroundColor: '#C1C1C1',
                opacity: .3,
            },
            css: {
                border: '1px solid #A0A0A0',
                backgroundColor: '#F7F7F7',
                //opacity: .6, 
                color: "#FFF",
                '-webkit-box-shadow': '0px 0px 5px 0px rgba(50, 50, 50, 0.75)',
                '-moz-box-shadow': '0px 0px 5px 0px rgba(50, 50, 50, 0.75)',
                'box-shadow': '0px 0px 5px 0px rgba(50, 50, 50, 0.75)',
                'border-radius': '5px',
                '-webkit-border-radius': '5px',
                '-moz-border-radius': '5px'
            }
        });
    },
    hide: function() {
        this.is_show = false;
        //this.element.style['display'] = "none";
        $.unblockUI();
    },
};
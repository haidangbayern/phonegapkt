var obj_chat = {
    notice_data: {
        user_id: null,
        user_name: null,
        avatar: null,
        count_messages: 0,
        show: false,
        url: null,
    },
    notice_popup_reset: function() {
        this.notice_data = {
            user_id: null,
            user_name: null,
            avatar: null,
            count_messages: 0,
            show: false,
            url: null,
        };
        $('#notice_chat').hide();
    },
    notice_popup_set_data: function(data) {
        if (data.user_id == this.notice_data.user_id) {
            this.notice_data.count_messages++;
        } else {
            this.notice_data.user_id = data.user_id;
            this.notice_data.user_name = data.user_name;
            this.notice_data.avatar = data.avatar;
            this.notice_data.count_messages = 1;
            this.notice_data.url = "#/app/friend_message/" + data.user_id;
        }
        if (navigator != undefined) {
            if (navigator.notification != undefined) {
                navigator.notification.beep(1);
                navigator.notification.vibrate(1500);
            }
        }
    },
    notice_popup_show: function() {
        this.notice_data.show = true;
        $('#notice_chat img[name=avatar]').attr('src', this.notice_data.avatar);
        if (this.notice_data.count_messages > 10) $('#notice_chat span[name=count_chat]').text("10+");
        else $('#notice_chat span[name=count_chat]').text(this.notice_data.count_messages);
        $('#notice_chat').show();
    },
    notice_popup_hide: function() {
        this.notice_data.show = false;
        $('#notice_chat').hide();
    },
    notice_popup_click: function() {
        //var url = this.notice_data.url;
        
        //location.href = url;
        // this.modal_quick_chat_init();
        // this.modal_quick_chat_open();
        open_modal_chat(this.notice_data.user_id);
        this.notice_popup_reset();
    },
};
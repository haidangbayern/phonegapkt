var user = {
    "sid" : "",
    "id" : "",
    "email" : "",
    "secret" : "",
    "first_name" : "",
    "last_name" : "",
    "nickname" : "",
    "usertype" : "",
    "last_login" : "",
    "number_view" : 0,
    "avatar" : "",
    "is_private_profile" : 0,
    "zip_code" : "",
    "birthday" : "",
    "weddingday" : "",
    "balance" : 0,
    "full_name" : "",
    "is_block_request_friend" : false,
    "payment" : obj_payment_account,
    set_name : function(first_name, last_name)
    {
        this.first_name = first_name;
        this.last_name = last_name;
        this.full_name = this.first_name + " " + this.last_name;
    },
    is_login : function(){
        if (!this.sid)
            return false;
        return true;
    },
    login : function(option) {
        this.sid = (new Date()).getTime();
        this.id = (option.id != undefined)?option.id:"";
        this.email = (option.email != undefined)?option.email:"";
        this.secret = (option.secret != undefined)?option.secret:"";
        this.first_name = (option.first_name != undefined)?option.first_name:"";
        this.last_name = (option.last_name != undefined)?option.last_name:"";
        this.nickname = (option.nickname != undefined)?option.nickname:"";
        this.usertype = (option.usertype != undefined)?option.usertype:"";
        this.last_login = (option.last_login != undefined)?option.last_login:"";
        this.number_view = (option.number_view != undefined)?option.number_view:"";
        this.avatar = (option.avatar != undefined)?option.avatar:"";
        this.is_private_profile = (option.is_private != undefined)?option.is_private:"";
        this.zip_code = (option.zip_code != undefined)?option.zip_code:"";
        this.birthday = (option.birthday != undefined)?option.birthday:"";
        this.weddingday = (option.weddingday != undefined)?option.weddingday:"";
        this.balance = (option.balance != undefined)?option.balance:"";
        this.is_block_request_friend = (option.is_block_request_friend != undefined)?option.is_block_request_friend:false;

        this.full_name = this.first_name + " " + this.last_name;
        this.number_view = Number(this.number_view);
        this.is_private_profile = Number(this.is_private_profile);
        if (this.birthday == "0000-00-00") this.birthday = "";
        if (this.weddingday == "0000-00-00") this.weddingday = "";
        this.balance = Number(this.balance);
        if (this.is_block_request_friend == "0")
            this.is_block_request_friend = false;
        else
            this.is_block_request_friend = true;

        obj_interface.html_user_left(user);
    },
    logout : function(){
        this.sid = "";
        this.id = "";
        this.email = "";
        this.first_name = "";
        this.last_name = "";
        this.nickname = "";
        this.usertype = "";
        this.last_login = "";
        this.number_view = 0;
        this.avatar = "";
        this.is_private_profile = 0;
        this.zip_code = "";
        this.birthday = "";
        this.weddingday = "";
        this.balance = 0;
    },
    validate_user: function(email, password) {
        obj_loading.show();
        var data = {
            'email' : email,
            'password' : password,
        };
        $.ajax({
            url: window.server_url+'/login/application_validate_credentials?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',  
            crossDomain: true,  
            success: function(data) {
                obj_loading.hide();
                var r = data;
                if (r.success != undefined && r.success == false) {
                    if (r.message != undefined)
                        window.showAlert('Warning', r.message);
                    obj_keyboard.waitForClose();
                } else {
                    user.login(r.user);
                    user.payment.setData(r.payment);
                    obj_socket.chat_socket();
                    window.location.href = "#/app/home2";
                }
            }
        });
    },
};

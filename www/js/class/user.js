/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var user = {
    "sid" : "",
    "id" : "",
    "email" : "",
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
        this.full_name = this.first_name + " " + this.last_name;
        this.number_view = Number(this.number_view);
        this.is_private_profile = Number(this.is_private_profile);
        if (this.birthday == "0000-00-00") this.birthday = "";
        if (this.weddingday == "0000-00-00") this.weddingday = "";
        this.balance = Number(this.balance);

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
                } else {
                    user.login(r.user);
                    window.location.href = "#/app/lottery";
                }
            }
        });
    },
};

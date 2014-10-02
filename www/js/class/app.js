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
var app = {
    is_action_callback: "",
    is_first_back: true,
    // Application Constructor
    initialize: function() {
        app.bindEvents();
    },
    bindDeviceInformation : function()
    {
        
        if (window.is_device){
            console.log("App: bind information device");
            $('#device_model').val(device.model);
            $('#device_cordova').val(device.cordova);
            $('#device_platform').val(device.platform);
            $('#device_uuid').val(device.uuid);
            $('#device_version').val(device.version);
            $('#device_name').val(device.name);    
        }
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener("backbutton", app.onBackKeyDown, false);
        document.addEventListener("menubutton", app.onMenuKeyDown, false);
        document.addEventListener("deviceready", app.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log("On deviceready");
        app.receivedEvent('deviceready_status');
        app.bindDeviceInformation();
    },
    onBackKeyDown: function() {
        console.log("onBackKeyDown");
        if ($('.lottery-main').length != 0)
        {
            if (typeof device != "undefined" && device.platform.toUpperCase() == "iOS".toUpperCase()){
                
            }
            else{
                app.exit();
            }
        }
        else
        {
            history.back();
        }
        

        // if (stask_back_page.length <= 1 ){
        //     navigator.notification.confirm(
        //       'Do you really want to get out of the game?'
        //         , function(button) {
        //               if (button == 2) {
        //                   navigator.app.exitApp();
        //               }
        //           }
        //         , 'Exit'
        //         , ["No", "Yes"]
        //     );  
        // }
        // else
        // {
        //     app.is_first_back = false;
        //     var back = stask_back_page.pop();
        //     console.log(back.action);
        //     eval(back.action);
        // }
    },
    onMenuKeyDown: function(){
        console.log("onMenuKeyDown");
        $('ion-nav-bar .ion-navicon').click();
    },
    exit: function()
    {
        navigator.notification.confirm(
          'Do you really want to get out of the game?'
            , function(button) {
                  if (button == 2) {
                      navigator.app.exitApp();
                  }
              }
            , 'Exit'
            , ["No", "Yes"]
        );  
        return false;
    },
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);

        //alert("onDeviceReady");
        obj_socket.initialize();
    },
};

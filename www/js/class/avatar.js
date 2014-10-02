var obj_avatar = {
    // Upload image to server
    upload: function(imageURI) {
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = (new Date).getTime() + '.jpg';
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.params = {
            "device_name" : device.name,
            "device_model" : device.model,
            "device_cordova" : device.cordova,
            "device_platform" : device.platform,
            "device_uuid" : device.uuid,
            "device_version" : device.version,
            "description": "Uploaded from phone",
            "user_id" : user.id,
        };
        
        obj_loading.show();
        var ft = new FileTransfer();
        // ft.onprogress = function(progressEvent) {
        //     if (progressEvent.lengthComputable) {
                //obj_loading.show(progressEvent.loaded / progressEvent.total);
                //loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
        //     } else {
                //obj_loading.show("Completed");
                //loadingStatus.increment();
        //     }
        // };
        ft.upload(imageURI, window.server_url + "/account/application_upload_avatar", obj_avatar.callback, obj_avatar.fail ,options);
    },
    takePictureFromCamera: function(e) { 
        var options = {
            quality: 45,
            targetWidth: 1000,
            targetHeight: 1000,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: Camera.PictureSourceType.CAMERA
        };
        navigator.camera.getPicture(this.upload, function(message) {
            //alert("canceled");
        }, options);
        return false;
    },
    takePictureFromGallery: function(e) {
        var options = {
            quality: 45,
            targetWidth: 1000,
            targetHeight: 1000,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };
        navigator.camera.getPicture(this.upload, function(message) {
            //alert("canceled");
        }, options);
        return false;
    },
    fail: function(error)
    {
        obj_loading.hide();
 		alert("Error Code = " + error.code);
        // https://github.com/apache/cordova-plugin-file-transfer/blob/master/doc/index.md
        // 1 = FileTransferError.FILE_NOT_FOUND_ERR
        // 2 = FileTransferError.INVALID_URL_ERR
        // 3 = FileTransferError.CONNECTION_ERR
        // 4 = FileTransferError.ABORT_ERR
        // 5 = FileTransferError.NOT_MODIFIED_ERR

    },
    callback: function (r) {
        obj_loading.hide();
		// console.log("Code = " + r.responseCode);
		// console.log("Response = " + r.response);
		// console.log("Sent = " + r.bytesSent);
        var data = JSON.parse(r.response);
        user.avatar = window.server_url + data.new_avatar;
        $('#modify_avatar').attr('src', user.avatar);
	}
};

var lottery_music = {
	select_normal_number: '',
	intro: '',
	bg: '',
	is_mute: '',
    is_test : false,
	run: function() {
	   if (!this.is_test)
       {
    		this.select_normal_number = new buzz.sound(path_music + "/lottery_click.wav"); //load music

    		this.intro = new buzz.sound(path_music + "/lottery_intro.mp3", {
    			autoplay: true,
    		}); //load music

    		this.intro.bind("timeupdate", function(e) {
    			//var timer = buzz.toTimer( mySound.getTime() ); 
    			//mySound.getTime() l?y second hi?n dang phát`	
    			//buzz.toTimer([second]) chuy?n t? second sang minute
    			var timer = buzz.toTimer(this.getTime());
    			if (timer == '00:09') {
    				this.fadeOut(2000, function(e2) {
    					this.stop();
    					lottery_music.bg.play();
    				});
    			}
    		});

    		this.bg = new buzz.sound(path_music + "/iron-man-01.mp3", {
    			loop: true,
    			volume: 10,
    		}); //load music

    		//*************** for PHONEGAP
    		if (typeof Media != "undefined" ){
    			
    			console.log("Install Music PHONEGAP")

    			this.select_normal_number = new Media(path_music + "/iron-man-01.mp3", onSuccess, onError);	
    		}
            

            // Play audio
            //my_media.play();

            // Update my_media position every second
            // if (mediaTimer == null) {
            //     mediaTimer = setInterval(function() {
            //         // get my_media position
            //         my_media.getCurrentPosition(
            //             // success callback
            //             function(position) {
            //                 if (position > -1) {
            //                     setAudioPosition((position) + " sec");
            //                 }
            //             },
            //             // error callback
            //             function(e) {
            //                 console.log("Error getting pos=" + e);
            //                 setAudioPosition("Error: " + e);
            //             }
            //         );
            //     }, 1000);
            // }

        }
	},
	click_normal_number: function() {
		if (this.is_mute != true && !this.is_test) {
			//run mp3
			this.select_normal_number.stop();
			this.select_normal_number.play();
		}
	},
	mute: function() {
		this.is_mute = true;
		this.intro.mute();
		this.bg.mute();
	},
	unmute: function() {
		this.is_mute = false;
		this.intro.unmute();
		this.bg.unmute();
	},
};

// onSuccess Callback
        //
        function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

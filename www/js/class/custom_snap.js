var obj_snap = {
	object : null,
	set : function(obj){
		this.object = obj;
		
		this.object.on('start', function(){
			obj_snap.animating();
		});
		this.object.on('drag', function(){
			obj_snap.animating();
		});
		this.object.on('animating', function(){
			obj_snap.animating();
		});
		this.object.on('animated', function(){
			obj_snap.animating();
		});
	},
	get : function(){
		return this.object;
	},
	togglePanel: function(panel){
		if (this.object.state().state == "closed")
		{
			this.object.open(panel);
			// var w = $('.snap-drawer-left').width();
			// $('#slide-nav').css('left', w + 'px');
		}
		else
		{
			//$('#slide-nav').css('left', '0px');
			this.object.close();
		}
	},
	animating: function()
	{
		// var css = $('#page-content').css('transform');
		// $('#slide-nav').css('transform',css);
	},
	close: function()
	{
		this.object.close();
	},
};
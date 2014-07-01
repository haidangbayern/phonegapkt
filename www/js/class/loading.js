var obj_loading = {
	element: null,
	is_show: false,
	set : function(obj){
		this.element = obj;
	},
	get : function(){
		return this.element;
	},
	toggle: function(is_show){
		if (is_show != undefined)
			this.is_show = is_show;
		else
			this.is_show = this.is_show?false:true;
		if (this.is_show)
			this.show();
		else
			this.hide();
	},
	show: function()
	{
		if (this.is_show)
			return;
		this.is_show = true;
		//this.element.style['display'] = "inline";
		$.blockUI({
			message: "<h1><i class='icon ion-loading-a'></i></h1>",
			overlayCSS: {
				backgroundColor: 'gray' 
			},
			css: { 
                border: 'none', 
                backgroundColor: 'transparent', 
                opacity: .6, 
                color: "#FFF",
            } 
		}); 
	},
	hide: function()
	{
		this.is_show = false;
		//this.element.style['display'] = "none";
		$.unblockUI();
	},
};
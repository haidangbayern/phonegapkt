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
		this.element.style['display'] = "inline";
	},
	hide: function()
	{
		this.element.style['display'] = "none";
	},
};
var obj_states = {
    data: {},
    //ok
    setData: function(data) {
        this.data = data;
    },
    getStatesByCountryId : function(country_id){
        var states = new Array();
        for (var i = 0; i < this.data.length - 1; i++) {
            var state = this.data[i];
            if (state.country_id == country_id)
                states.push(state);
        };
        if (states.length == 0)
            return null;
        return states;
    },
    getStateById : function(id)
    {
        for (var i = this.data.length - 1; i >= 0; i--) {
            var state = this.data[i];
            if (state.id == id)
                return state;
        };
        return null;
    },
};

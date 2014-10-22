var product_categories = {
    "data": "",
    "data_required": {}, //data required of user
    "current_program": null,
    setData: function(data) {
        this.data = [];
        var unit = "";
        for (var i = 0; i < data.length; i++) {
            this.data.push(data[i]);
        }
    },
    getProductById: function(product_id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id == product_id) return this.data[i];
        }
        return null;
    },

};

var products = {
    "data": "",
    "data_required": {}, //data required of user
    "current_program": null,
    setData: function(data) {
        this.data = [];
        var unit = "";
        for (var i = 0; i < data.length; i++) {
            this.data.push(data[i]);
        }
    },
    getProductById: function(product_id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id == product_id) return this.data[i];
        }
        return null;
    },

};
var product_detail = {
    "data": "",
    "data_required": {}, //data required of user
    "current_program": null,
    setData: function(data) {
        this.data = [];
        var unit = "";
        for (var i = 0; i < data.length; i++) {
            this.data.push(data[i]);
        }
    },
    getProductById: function(product_id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id == product_id) return this.data[i];
        }
        return null;
    },

};
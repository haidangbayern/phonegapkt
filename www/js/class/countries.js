var obj_countries = {
    data: {},
    //ok
    setData: function(data) {
        this.data = data;
        var data_us = null;
        var data_ca = null;
        var us_index = -1;
        var ca_index = -1;
        for (var i = this.data.length - 1; i >= 0 && (!data_us || !data_ca); i--) {
            var country = this.data[i];
            if (country.iso2 == window.US_ISO2) {
                data_us = country;
                us_index = i;
            }
            if (country.iso2 == window.CA_ISO2) {
                data_ca = country;
                ca_index = i;
            }
        };
        if (us_index != -1)
            this.data.splice(us_index, 1);
        if (ca_index != -1)
            this.data.splice(ca_index, 1);
        this.data.unshift(data_us,data_ca);
    },
    getCountry: function(id) {
        for (var i = this.data.length - 1; i >= 0; i--) {
            var country = this.data[i];
            if (country.id.toString() == id.toString()) return country;
        };
        return null;
    },
};
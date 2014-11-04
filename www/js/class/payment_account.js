var obj_payment_account = {
    data: {},
    setData: function(data) {
        this.data = data;
        for (var i = 0; i < this.data.length; i++) {
            var address = this.data[i].address;
            this.data[i].address.country = obj_countries.getCountry(address.country);
            var states = obj_states.getStateById(this.data[i].address.state);
            this.data[i].address.state = (states == null) ? this.data[i].address.state :states.name;
        };
    },
    getPaymentByPaymentAccountId:function (payment_account_id)
    {
        for (var i = 0; i < this.data.length; i++) {
            if (Number(this.data[i].payment_account_id) == Number(payment_account_id))
                return this.data[i];
        };
        return null;
    }
};
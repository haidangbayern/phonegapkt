var obj_payment = {
    old_cc_file : "templates/payment/old_credit_card.html",
    new_cc_file : "templates/payment/new_credit_card.html",
    select_option : "templates/payment/select_option.html",
    current_file : "templates/payment/new_credit_card.html",
    
    resources : {
        countries : obj_countries,
        states : null,
        payment : null,
    },
    data_new_account: {
        'card_type' : 'Visa',
        'card_holder_name' : null,
        'card_number' : null,
        'cvv' : null,
        'exp_date' : null,
        'address_1' : null,
        'address_2' : null,
        'country' : obj_countries.getCountry(window.US),
        'zip_code' : null,
        'city' : null,
        'state' : null,
        'phone_1' : null,
        'phone_2' : null,
        'phone_3' : null,
        'save' : false,
    },
    data_old_account: {
        'payment_account_id' : null,
    },
    data_required : {},
    data_to_payment : {},
    current_account: null, //0: New Account
    __construct : function()
    {
        if (user.payment.data.length > 0)
            this.current_account = user.payment.data[0];
        else
            this.current_account = null;
       
        this.select_account();
    
    },
    removeDataRequired: function() {
        this.data_required = {};
    },
    view_old_payment : function()
    {

    },
    select_account : function()
    {
        if (this.current_account == null)
        {
    		this.current_file = this.new_cc_file;
            this.resources.states = obj_states.getStatesByCountryId(window.US);
            this.data_new_account.country =  obj_countries.getCountry(window.US);
            this.data_new_account.state =  this.resources.states?this.resources.states[0]:null;
            this.data_required = this.data_new_account;

            if (window.is_dev)
            {
                this.data_required.card_holder_name = "DEV " + user.full_name + " " + (new Date()).getTime();
                this.data_required.card_number=window.dev_data[window.server_ip].new_cc.card_number;
                this.data_required.cvv = window.dev_data[window.server_ip].new_cc.cvv;
                this.data_required.exp_date= window.dev_data[window.server_ip].new_cc.exp_date;
                this.data_required.address_1= window.dev_data[window.server_ip].new_cc.address_1;
                this.data_required.zip_code= window.dev_data[window.server_ip].new_cc.zip_code;
                this.data_required.city= window.dev_data[window.server_ip].new_cc.city;
                this.data_required.phone_1= window.dev_data[window.server_ip].new_cc.phone_1;
                this.data_required.phone_2=  window.dev_data[window.server_ip].new_cc.phone_2;
                this.data_required.phone_3=  window.dev_data[window.server_ip].new_cc.phone_3;
            }
        }
    	else
        {
    		this.current_file = this.old_cc_file;
            this.data_old_account.payment_account_id = this.current_account.payment_account_id;
            this.data_required = this.data_old_account;
            this.resources.payment = user.payment.data;
        }
    },
    getPercentTaxByState: function()
    {
        if (typeof this.data_required.payment_account_id != "undefined")
        {
            var old_payment = obj_payment_account.getPaymentByPaymentAccountId(this.data_required.payment_account_id);
            var stateText = old_payment.address.state;
            var tax = obj_states.getTaxByCountryAndStateText(old_payment.address.country.id, stateText);
            return Number(tax);
        }
        else
        {
            if (typeof this.data_required.state == "object" && this.data_required.state)
                return Number(this.data_required.state.tax);    
        }
        return 0;
    },
    isDisablePay : function()
    {
        //this.current_account = Number(this.current_account);
        if (this.current_account == null)
        {
            if (this.data_required.card_holder_name && 
                this.data_required.card_number && 
                this.data_required.cvv &&
                this.data_required.exp_date &&
                this.data_required.address_1 &&
                this.data_required.country &&
                this.data_required.zip_code &&
                this.data_required.city &&
                this.data_required.state && 
                this.data_required.phone_1 &&
                this.data_required.phone_2 )
                return false;
                
        }
        else
        {
            if (this.data_required.payment_account_id)
                return false;
        }
        return true;
    },
    changeCountry: function(){
        if (Number(this.data_required.country.id) == window.US || Number(this.data_required.country.id) == window.CA)
        {
            this.resources.states = obj_states.getStatesByCountryId(this.data_required.country.id);
            this.data_required.state =  this.resources.states?this.resources.states[0]:null;
        }
        else
        {
            this.resources.states = null;
            this.data_required.state =null;
        }
    },
    beforePayCheckut: function() {
        for(key in this.data_required )
        {
            this.data_to_payment[key] = this.data_required[key];
        }
        this.data_to_payment.user_id = user.id;
        if (typeof this.data_to_payment.payment_account_id == "undefined")
        {
            if (typeof this.data_to_payment.state == "object")
                this.data_to_payment.state = this.data_to_payment.state.id;
            if (typeof this.data_to_payment.country == "object")
                this.data_to_payment.country = this.data_to_payment.country.id;
        }    
    },
    afterPayCheckoutFail: function() {
        // if (typeof this.data_required.payment_account_id == "undefined")
        // {
        //     this.data_required.country =  obj_countries.getCountry(this.data_required.country);
        //     if (Number(this.data_required.country.id) == window.US || 
        //         Number(this.data_required.country.id) == window.CA)
        //     {
        //         this.data_required.state =  obj_states.getStateById(this.data_required.state);
        //     }
        //     delete this.data_required.user_id;
        // }
        this.data_to_payment = {};
    },
    afterPayCheckoutSucc: function() {
        this.removeDataRequired();
        this.data_to_payment = {};
    },

    shipping : {
        template_file : "templates/payment/ship_info.html",
        data : {
            'first_name' : null,
            'last_name' : null,
            'address_1' : null,
            'address_2' : null,
            'country' : null,
            'zip_code' : null,
            'city' : null,
            'state' : null,
            'phone_1' : null,
            'phone_2' : null,
            'phone_3' : null,
        },
        data_to_payment : {},
        resources : {
            countries : obj_countries,
            states : null,
        },
        __construct : function()
        {
              

            if (this.data.first_name == null)
            {
                this.resources.states = obj_states.getStatesByCountryId(obj_countries.getCountry(window.US).id);    
                this.data.country = obj_countries.getCountry(window.US);
                this.data.state =  this.resources.states?this.resources.states[0]:null;
            }

             

            if (window.is_dev)
            {
                this.data.first_name = this.data.first_name == null ? window.dev_data[window.server_ip].shipping_info.first_name : this.data.first_name;


                this.data.last_name = this.data.last_name == null ? window.dev_data[window.server_ip].shipping_info.last_name : this.data.last_name;

                this.data.address_1 = this.data.address_1 == null ? window.dev_data[window.server_ip].shipping_info.address_1 : this.data.address_1;

                this.data.address_2 = this.data.address_2 == null ? window.dev_data[window.server_ip].shipping_info.address_2 : this.data.address_2;

                this.data.zip_code = this.data.zip_code == null ? window.dev_data[window.server_ip].shipping_info.zip_code : this.data.zip_code;

                this.data.city = this.data.city == null ? window.dev_data[window.server_ip].shipping_info.city : this.data.city;

                this.data.phone_1 = this.data.phone_1 == null ? window.dev_data[window.server_ip].shipping_info.phone_1 : this.data.phone_1;

                this.data.phone_2 = this.data.phone_2 == null ? window.dev_data[window.server_ip].shipping_info.phone_2 : this.data.phone_2;

                this.data.phone_3 = this.data.phone_3 == null ? window.dev_data[window.server_ip].shipping_info.phone_3 : this.data.phone_3;
            }

         
        },
        changeCountry : function(){
            if (Number(this.data.country.id) == window.US || Number(this.data.country.id) == window.CA)
            {
                this.resources.states = obj_states.getStatesByCountryId(this.data.country.id);
                this.data.state =  this.resources.states?this.resources.states[0]:null;
            }
            else
            {
                this.resources.states = null;
                this.data.state =null;
            }
        },
        validateShippingData : function()
        {
            if (this.data.first_name && 
                this.data.last_name && 
                this.data.address_1 &&
                this.data.country &&
                this.data.zip_code &&
                this.data.city &&
                this.data.state &&
                this.data.phone_1 &&
                this.data.phone_2 )
                return false;
            return true;
        },
        getPercentTaxByState: function()
        {
            if (typeof this.data.state == "object" && this.data.state)
                return Number(this.data.state.tax);
            return 0;
        },
        beforePayCheckut: function() {
            for(key in this.data )
            {
                this.data_to_payment[key] = this.data[key];
            }
            this.data_to_payment.user_id = user.id;
            if (typeof this.data_to_payment.state == "object")
                this.data_to_payment.state = this.data_to_payment.state.id;
            if (typeof this.data_to_payment.country == "object")
                this.data_to_payment.country = this.data_to_payment.country.id;
        },
        afterPayCheckoutFail: function() {
            // this.data.country =  obj_countries.getCountry(this.data.country);
            // if (Number(this.data.country.id) == window.US || 
            //     Number(this.data.country.id) == window.CA)
            // {
            //     this.data.state =  obj_states.getStateById(this.data.state);
            // }
            // delete this.data.user_id;
            this.data_to_payment = {};
        },
        afterPayCheckoutSucc: function() {
            // this.data.country =  obj_countries.getCountry(this.data.country);
            // if (Number(this.data.country.id) == window.US || 
            //     Number(this.data.country.id) == window.CA)
            // {
            //     this.data.state =  obj_states.getStateById(this.data.state);
            // }
        },

    },
};

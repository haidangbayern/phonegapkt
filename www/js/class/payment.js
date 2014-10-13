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
                this.data_required.card_number='4111111111111111';
                this.data_required.cvv = '111';
                this.data_required.exp_date='2015-11';
                this.data_required.address_1='1400 N. W. 65th Place Fort Lauderdale, FL 33309';
                this.data_required.zip_code='33309';
                this.data_required.city='Fort Lauderdale';
                this.data_required.phone_1='954';
                this.data_required.phone_2= '9177592';
                this.data_required.phone_3= '3009';
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
        this.data_required.user_id = user.id;
        if (typeof this.data_required.payment_account_id == "undefined")
        {
            if (typeof this.data_required.state == "object")
                this.data_required.state = this.data_required.state.id;
            if (typeof this.data_required.country == "object")
                this.data_required.country = this.data_required.country.id;
        }
    },
    afterPayCheckoutFail: function() {
        if (typeof this.data_required.payment_account_id == "undefined")
        {
            this.data_required.country =  obj_countries.getCountry(this.data_required.country);
            if (Number(this.data_required.country.id) == window.US || 
                Number(this.data_required.country.id) == window.CA)
            {
                this.data_required.state =  obj_states.getStateById(this.data_required.state);
            }
            delete this.data_required.user_id;
        }
    },
    afterPayCheckoutSucc: function() {
        this.removeDataRequired();
    },
};

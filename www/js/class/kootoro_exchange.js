var kootoro_exchange = {
    "data": "",
    "data_required": {}, //data required of user
    "current_program": null,
    setData: function(data) {
        this.data = data;
    },
    getProgramById: function(program_id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id == program_id) return this.data[i];
        }
        return null;
    },
    setCurrentProgramById: function(program_id) {
        this.current_program = this.getProgramById(program_id);
    },
    setDataRequired: function(option) {
        this.data_required.program_id = (option['program_id'] != undefined) ? option['program_id'] : "";
        this.data_required.month = (option['month'] != undefined) ? option['month'] : "-1";
        this.data_required.member_id = (option['member_id'] != undefined) ? option['member_id'] : "";
        this.data_required.how_many = (option['how_many'] != undefined) ? option['how_many'] : "";
        this.data_required.fee = (this.current_program) ? this.current_program.fee : "0";
    },
    validateDataRequired: function() {
        var rep = {
            "result": true,
            "message": "",
        };
        this.data_required.how_many = Number(this.data_required.how_many);
        if (this.data_required.how_many == NaN) {
            rep.result = false;
            if (rep.message != "") rep.message += "<br/>";
            rep.message += window.languages[window.current_language].invalid_data;
        }
        if (this.data_required.how_many < this.current_program.min_bonus) {
            rep.result = false;
            if (rep.message != "") rep.message += "<br/>";
            rep.message += window.languages[window.current_language].error_how_many + numeral(this.current_program.min_bonus).format('0,0') + ".";
        }
        if (this.data_required.member_id == 0 || this.data_required.member_id == "") {
            rep.result = false;
            if (rep.message != "") rep.message += "<br/>";
            rep.message += window.languages[window.current_language].error_member_id_card_code;
        }
        return rep;
    },
    removeDataRequired: function() {
        this.data_required = {};
    },
    beforeTradeInCheckut: function() {
        this.data_required.id = this.data_required.program_id;
        this.data_required.user_id = user.id;
    },
    afterTradeInCheckout: function() {
        this.removeDataRequired();
    },
};
window.Account = Backbone.Model.extend({
	
	urlRoot: "rest/accounts",
	
	initialize: function () {
        //map key/value for validation 
		this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter an account name"};
        };

        this.validators.username = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter an username"};
        };        
        
        this.validators.password = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a password"};
        };        
    },
    
    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },
	
	validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },
    
    defaults: {
        id: null,
        name: "",
        username: "",
        password: "",
        picture: "-1",
        modifyDate: ""	
    }
    
});

window.AccountsCollection = Backbone.Collection.extend({
	model: Account,
	url: "rest/accounts/getAccountList",		
    initialize: function(){
        console.log("Accounts collection initialized");
    },

	findByName:function (key) {		
		var url = 'rest/accounts/findbyname/'+ key;
		console.log('findByName: ' + url);
		console.log('findByName: ' + key);
		var self = this;
	    $.ajax({
	        url:url,
	        dataType:"json",
	        success:function (data) {
	            //console.log("search success: " + data.length);
	            self.reset(data);
	        }	    	
	    });
	}
});
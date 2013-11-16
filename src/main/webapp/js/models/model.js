window.Account = Backbone.Model.extend({
	urlRoot: "rest/accounts",
	
	initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.username = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a grape variety"};
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
        password: ""        
    }
    
});

window.AccountsCollection = Backbone.Collection.extend({
	model: Account,
	url: "rest/accounts/getAccountList",	
	/*Quando la collection viene creata, la funzione initialize viene eseguita 
	 * automaticamente da backbone*/
    initialize: function(){
        console.log("Accounts collection initialize");
    },

	findByName:function (key) {
		//var url = (key == '') ? '/rest/accounts/getAccountList' : "rest/accounts/1" + key;
		var url = 'rest/accounts/getAccountList';
		console.log('findByName: ' + key);
		var self = this;
	    $.ajax({
	        url:url,
	        dataType:"json",
	        success:function (data) {
	            console.log("search success: " + data.length);
	            self.reset(data);
	        }
	    });
	}
});
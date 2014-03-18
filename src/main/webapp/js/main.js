window.Router = Backbone.Router.extend({

    routes: {
    	"": "home",
        "accounts": "accountsList",
        "account/add": "addAccount",
        "accounts/page/:page": "accountsList",
        "account/:id": "accountDetails",
    },

    initialize: function () {
        this.headerView = new HeaderView();
    	$('.header').html(this.headerView.render().el);
    	this.footerView = new FooterView();		
    	$('.footer').html(this.footerView.render().el);
    	
        // Close the search dropdown on click anywhere in the UI
        $('body').click(function () {        	
        	$('.dropdown').removeClass("open");
        });
    },

    home: function () {
        //Since the home view never changes, we instantiate it and render it only once    	
        if (!this.homeView) {        	        	
            this.homeView = new HomeView();        	
            this.homeView.render();
        } else {
            this.homeView.delegateEvents(); // delegate events when the view is recycled
        }                
        $("#content").html(this.homeView.el);
        this.headerView.select('home-menu');                                
    },
    
    accountsList: function(page) {
    	//$('#loadingModal').modal('show');
    	$('#loadingimage').show();
    	var p = page ? parseInt(page, 10) : 1;
        var accountsList = new AccountsCollection();
        accountsList.fetch({success: function(){
            $("#content").html(new ListView({model: accountsList, page: p}).el);
            //$('#loadingModal').modal('hide');
            $('#loadingimage').hide();
        }});
        this.headerView.select('accounts-menu');        
    },
    
    accountDetails: function (id) {
        var account = new Account({id: id});
        account.fetch({success: function(){
            $("#content").html(new DetailsView({model: account}).el);
        }});        
//        this.headerView.selectMenuItem();
    },
    
    addAccount: function() {
        var account = new Account();
        $('#content').html(new DetailsView({model: account}).el);
        //$('#deleteAccountButton').prop('disabled', true);
        $('#deleteAccountButton').hide();  
        this.headerView.select('add-menu');
	},
    
});

templateLoader.load(["HeaderView","HomeView","FooterView","ListView","ListItemView","DetailsView","SearchResultItemView"],
	function () {
		app = new Router();
		Backbone.history.start();
	});
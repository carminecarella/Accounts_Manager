window.HeaderView = Backbone.View.extend({

    initialize: function () {
        this.searchResults = new AccountsCollection();
        this.searchresultsView = new SearchResultView({model: this.searchResults, className: 'dropdown-menu'});
    },

    render: function () {    	
        $(this.el).html(this.template());        
        $('.dropdown', this.el).append(this.searchresultsView.render().el);           
        return this;
    },

    events: {
        "keyup .search-query": "search",
        "keypress .search-query": "onkeypress",
        "click .search-query": "clean"	
    },

    search: function () {    	
    	$('#loadingimage').show();
    	
        var key = $('#searchText').val();
        
        console.log('search ' + key);
        
        this.searchResults.findByName(key);
        
        var size = this.searchResults.length;
        
        setTimeout(function () {        	
        	$('.dropdown').addClass('open');
        	$('#loadingimage').hide();        	
        	//$('.dropdown-menu').fadeIn(1000);
        }, 1500);        
        
    },

    onkeypress: function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    },

    select: function(menuItem) {
        $('.nav li').removeClass('active');
        $('.' + menuItem).addClass('active');
    },
    
    clean: function () {      	
    	$('#searchText').val("");
    }

});
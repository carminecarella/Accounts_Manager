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
        "keypress .search-query": "onkeypress"
    },

    search: function () {    	
        var key = $('#searchText').val();
        console.log('search ' + key);
        this.searchResults.findByName(key);
        setTimeout(function () {
        	
            $('.dropdown').addClass('open');
            
        }, 1000);        
    },

    onkeypress: function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    },

    select: function(menuItem) {
        $('.nav li').removeClass('active');
        $('.' + menuItem).addClass('active');
    }

});
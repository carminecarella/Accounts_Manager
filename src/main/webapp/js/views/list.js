window.ListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var list = this.model.models;
        var len = list.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        //$(this.el).html('<div class="row"><div class="span12"><h2>Shop List</h2><ul class="thumbnails"></ul></div></div>');
        $(this.el).html(this.template());

        for (var i = startPos; i < endPos; i++) {
            $('.accountslist', this.el).append(new ListItemView({model: list[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.ListItemView = Backbone.View.extend({

    /*tagName: "li",
    className: "span3",*/

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

window.SearchResultView = Backbone.View.extend({
	 tagName:'ul',

	 className:'dropdown-menu',

	 initialize:function () {
	    var self = this;
	    this.model.bind("reset", this.render, this);
	    this.model.bind("add", function (account) {
	        $(self.el).append(new SearchResultItemView({model:account}).render().el);
	    });
	 },

     render:function () {
        $(this.el).empty();  
        if(this.model.size() > 0){
	        _.each(this.model.models, function (account) {        	        	
	        	$(this.el).append(new SearchResultItemView({model:account}).render().el);        	
	        }, this);
        } else {
        	$(this.el).append('<li class="elementSearchResult disabled"><a href="#"><div class="row"><div class="col-xs-4"><img src="./resources/img/no_result.png" alt=""></div><div class="col-xs-8" style="padding-top:5px">No result</div></div></a></li>');
        } 
        	
        return this;
     }
});

window.SearchResultItemView = Backbone.View.extend({

    tagName:"li",
    
    className: "elementSearchResult",

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});
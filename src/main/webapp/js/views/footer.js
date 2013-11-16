window.FooterView = Backbone.View.extend({

    initialize: function () {
    	$("#mypop").popover({
 	        placement : 'left'
     	});	
    },
    
    events:{        
        "click #mypop":"showPopup"        	
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    
    select: function(menuItem) {
        $('.nav li').removeClass('active');
        $('.' + menuItem).addClass('active');
    },
    
    showPopup:function () {
    	$("#mypop").popover('show');
    }

});

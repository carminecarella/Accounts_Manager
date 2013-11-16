window.Paginator = Backbone.View.extend({
	tagName: "ul",
    className: "pagination",

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.render();
    },

    render:function () {

        var items = this.model.models;
        var len = items.length;
        var pageCount = Math.ceil(len / 8);

        $(this.el).html('<ul />');

        for (var i=0; i < pageCount; i++) {
        	$(this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#accounts/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
            //$('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#accounts/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
        }

        return this;
    }
});
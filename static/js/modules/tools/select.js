define([
    'lib/backbone'
], function(Backbone) {

    var SelectTool = Backbone.View.extend({

        events: {
            'click svg': 'clickSVG'
        },

        initialize: function() {
            console.log('  --> Initializing select tool');
            this.svg = d3.select('#' + this.$el.attr('id'))
                         .select('svg')
                         .select('g#offset-group');
        },

        destroy: function() {
            this.undelegateEvents();
        },

        clickSVG: function(e) {
            if (!e.shiftKey) {
                this.svg.selectAll('.selected').classed('selected', false);
            }
            d3.select(e.target).classed('selected', true);
        }

    });

    return SelectTool;

});

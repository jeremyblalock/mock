define([
    'lib/backbone',
    'lib/d3',
    'lib/underscore'
], function(Backbone, d3, _) {

    var RectTool = Backbone.View.extend({

        events: {
            'mousedown svg':  'startDrag'
        },

        initialize: function() {
            console.log('  --> Initializing rect tool');
            this.currentDrag = null;
            this.svg = d3.select('#' + this.$el.attr('id'))
                         .select('svg')
                         .select('g#offset-group');

            _.bindAll(this);
        },

        destroy: function() {
            this.undelegateEvents();
        },

        startDrag: function(e) {
            this.currentDrag = e;
            this.currentRect = this.svg.append('rect')
                                       .attr('stroke-dasharray', '5,5')
                                       .attr('stroke', 'rgba(0, 0, 0, .4)')
                                       .attr('fill', 'none');
            $('body').on('mousemove', this.drag);
            $('body').on('mouseup', this.endDrag);
            this.svg.selectAll('.selected').classed('selected', false);
        },

        cancelDrag: function(e) {
            //this.currentRect.remove();
            return false;
        },

        drag: function(e) {
            if (this.currentDrag === null) {
                return false;
            }
            // TODO: Add scale function to remove hardcoded '20'
            var xVals = [e.pageX - 20, this.currentDrag.pageX - 20],
                yVals = [e.pageY - 20, this.currentDrag.pageY - 20];
            this.currentRect.attr('x', d3.min(xVals))
                            .attr('y', d3.min(yVals))
                            .attr('width', Math.abs(xVals[0] - xVals[1]))
                            .attr('height', Math.abs(yVals[0] - yVals[1]));
        },

        endDrag: function(e) {
            this.drag(e);
            this.currentDrag = null;
            $('body').off('mousemove', this.drag);
            $('body').off('mouseup', this.endDrag);
            this.currentRect.attr('stroke-dasharray', null)
                            .attr('stroke', null)
                            .attr('fill', null);
            this.currentRect.classed('selected', true);
        }

    });

    return RectTool;

});

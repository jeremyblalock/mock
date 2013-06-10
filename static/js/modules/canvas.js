define([
    'lib/backbone',
    'lib/d3',
    'lib/underscore',
    'modules/tools/select',
    'modules/tools/rect',
    'modules/key-events'
], function(Backbone, d3, _, SelectTool, RectTool, KeyEvents) {

    var Canvas = Backbone.View.extend({

        initialize: function() {
            console.log("Initializing canvas");

            _.bindAll(this, ['deleteSelection']);

            this.svgWrapper = this.$el.append(
                '<div id="mock_svg_wrapper"></div>');
            this.svg = d3.select('#mock_svg_wrapper').append('svg');

            this.svg.attr('width', 1200)
                    .attr('height', 900)
                    .attr('id', 'canvas-svg');

            this.offsetGroup = this.svg.append('g');
            this.offsetGroup.attr('transform', 'translate(0 0)')
                            .attr('id', 'offset-group');

            this.tools = {}
            this.tools['select'] = SelectTool;
            this.tools['rect'] = RectTool;

            KeyEvents.on('delete', this.deleteSelection);
        },

        setTool: function(toolName) {
            var undef;
            if (!(toolName in this.tools)) {
                alert('Error: The "' + toolName + '" tool does not exist.');
                return false;
            }
            if (typeof this.currentTool !== typeof undef) {
                this.currentTool.destroy();
            }
            this.currentTool = new this.tools[toolName]({
                el: this.svgWrapper
            });
        },

        deleteSelection: function() {
            this.offsetGroup.selectAll('.selected').remove();
        }

    });

    return Canvas;

});

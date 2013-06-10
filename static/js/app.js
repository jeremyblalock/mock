define([
    'lib/backbone',
    'modules/toolbar',
    'modules/canvas',

    // Does not need to be referenced with a variable, since only adds jquery
    // plugin, no new global functions.
    'lib/jquery-ui',
    'lib/jquery-ui-touch-punch'
], function(Backbone, Toolbar, Canvas) {

    var AppView = Backbone.View.extend({

        events: {
            'touchstart': 'cancelTouch'
        },

        initialize: function() {
            this.$('#top').draggable();
            this.toolbar = new Toolbar({
                el: '.toolbar_wrapper'
            });
            this.canvas = new Canvas({
                el: '#canvas'
            });
            this.toolbar.on('switchTool', this.switchTool, this);
            this.toolbar.setTool('rect');
        },

        switchTool: function(toolName) {
            console.log("Switched tool, to", toolName);
            this.canvas.setTool(toolName);
        },

        cancelTouch: function(e) {
            e.preventDefault();
        }

    });

    return AppView;
});

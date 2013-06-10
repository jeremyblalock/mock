define([
    'lib/backbone'
], function(Backbone) {

    var Toolbar = Backbone.View.extend({

        initialize: function() {
            console.log("Initializing toolbar");
        },

        events: {
            'click a': 'clickTool'
        },

        setTool: function(toolName) {
            var $tool = this.$('a[name=' + toolName + ']');
            if ($tool.size() > 0) {
                if ($tool.hasClass('current')) {
                    return false;
                }
                this.$('a').removeClass('current');
                $tool.addClass('current');
                this.trigger('switchTool', toolName);
            }
            return false;
        },

        clickTool: function(e) {
            var toolName = $(e.target).attr('name');
            this.setTool(toolName);
        }

    });

    return Toolbar;

});

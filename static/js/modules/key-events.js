define([
    'lib/backbone',
    'lib/underscore'
], function(Backbone, _) {

    var KeyEvents = Backbone.View.extend({

        initialize: function() {
            _.bindAll(this, ['handleKeypress']);
            $(document).on('keydown', this.handleKeypress);
        },

        handleKeypress: function(e) {
            console.log(e.which, this);
            if (e.which === 8) {
                e.preventDefault();
                this.trigger('delete');
            }
        },

        destroy: function() {
            $(document).off('keydown', this.handleKeypress);
        },

        remove: function() {
            this.destroy();
        }

    });

    return new KeyEvents();

});

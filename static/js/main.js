requirejs.config({
    shim: {
        'lib/d3': {
            exports: 'd3'
        },
        'lib/backbone': {
            deps: ['lib/underscore'],
            exports: 'Backbone'
        },
        'lib/underscore': {
            exports: '_'
        }
    }
});

require(['app'], function(App) {
    var app = new App({
        el: '#wrapper'
    });
})

///<reference path="./typings/tsd.d.ts" />

require.config({
    baseUrl:'./',
    paths: {
        'app': '/app/app',
        'services': '/app/js/services/module',
        'controllers': '/app/js/controllers/module',
        'directives': '/app/js/directives/module',
        'jquery': '/static/lib/jquery/jquery',
        'angular': '/static/lib/angular/js/angular',
        'angular-route': '/static/lib/angular-route/js/angular-route',
        'angular-resource': '/static/lib/angular-resource/js/angular-resource',
        'bootstrap': '/static/lib/bootstrap/js/bootstrap',
        'leaflet': '/static/lib/leaflet/leaflet'
    },

    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-route': ['angular'],
        'angular-resource': ['angular'],
        'bootstrap': ['jquery'],
        'leaflet': {
            exports: 'L'
        }
    }
});

// startup the application
require(['angular', 'leaflet', 'app'],
    function (angular,app) {
                angular.bootstrap(document, ['app']);
    }
);

///<reference path="typings/tsd.d.ts" />
require.config({
    paths: {
        'angular': 'lib/angular/angular',
        'ui-router': 'lib/angular-ui-router/release/angular-ui-router',
        'domReady': 'lib/requirejs-domready/domReady',
        'app': './app',
        'nemLogging': 'lib/angular-simple-logger/dist/angular-simple-logger',
        'ui-leaflet': 'lib/ui-leaflet/dist/ui-leaflet',
        'ngRoute': 'lib/angular-route/angular-route',
        'd3': 'lib/d3/d3',
        'nvd3': 'lib/nvd3/build/nv.d3',
        'leaflet': 'lib/leaflet/dist/leaflet',
        'leaflet-heat': 'lib/Leaflet-HeatMap/dist/leaflet-heat',
        'jquery': 'lib/jquery/dist/jquery',
        'bootstrap': 'lib/bootstrap/dist/js/bootstrap',
        'underscore': 'lib/underscore/underscore',
        'angular-nvd3': 'lib/angular-nvd3/dist/angular-nvd3'
    },
    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'nemLogging': {
            exports: 'angular',
            deps: ['angular']
        },
        'ui-leaflet': {
            exports: 'angular',
            deps: ['angular', 'nemLogging','leaflet','leaflet-heat']
        },
        'ui-router':{
          exports: 'angular',
            deps: ['angular']
        },
        'd3': {
            exports: 'd3'
        },
        'nvd3': {
            exports: 'nv',
            deps: ['d3']
        },
        'leaflet': {
            exports: 'L'
        },
        'leaflet-heat': {
            exports: 'L',
            deps: ['leaflet']
        },
        'jquery': {
            exports: '$'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'angular-nvd3': {
            deps: ['angular','nvd3']
        },
        'app': {
            deps: ['bootstrap', 'angular', 'underscore','ui-leaflet','angular-nvd3','nemLogging','ui-router']
        }
    },
    deps: ['./boot']
});
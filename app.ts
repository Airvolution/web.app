///<reference path="./typings/tsd.d.ts" />
//These are hacked to work. Others don't need to do this.va

import services = require('./app/services/module');
services;
import controllers = require('./app/controllers/module');
controllers;
import directives = require('./app/directives/module');
directives;

angular.module('app', [
        'nemLogging',
        'ui-leaflet',
        'ngRoute',
        'services',
        'controllers',
        'directives',
        'nvd3'

    ])
    .config(($routeProvider)=> {
        $routeProvider.when('/Almanac', {
                templateUrl: "app/templates/almanac.html"
            })
            .when('/', {
                templateUrl: 'app/templates/almanac.html'
            })
            .when('/Compare', {
                templateUrl: 'app/templates/compare.html'
            })
            .when('/Indoor', {
                templateUrl: 'app/templates/indoor.html'
            })
            .when('/Map', {
                templateUrl: 'app/templates/map.html'
            })
            .when('/Radar', {
                templateUrl: 'app/templates/radar.html'
            })
            .when('/MyProfile',{
                templateUrl: 'app/templates/myProfile.html'
            })
            .when('/MyStations',{
                templateUrl: 'app/templates/myStations.html'
            })
            .when('/RegisterStation',{
                templateUrl: 'app/templates/registerStation.html'
            })
            .when('/404', {
                templateUrl: 'app/templates/404.html'
            })
            .otherwise({
                redirectTo: '/404'
            });
    });
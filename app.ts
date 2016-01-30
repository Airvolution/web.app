///<reference path='./typings/tsd.d.ts' />

import services = require('./app/services/module');
services;
import controllers = require('./app/controllers/module');
controllers;
import directives = require('./app/directives/module');
directives;

angular.module('app', [
        'nemLogging',
        'ui-leaflet',
        'ui.router',
        'services',
        'controllers',
        'directives',
        'nvd3',
        'ngStorage',
        'ui.bootstrap',
        'ngAnimate'

    ])
    .config(($stateProvider, $urlRouterProvider, $httpProvider) => {
        $urlRouterProvider.otherwise('/map');
        $stateProvider
            .state('map', {
                url: '/map',
                templateUrl: 'app/templates/map.html'
            })
            .state('almanac', {
                url: '/almanac',
                templateUrl: 'app/templates/alamanac.html'
            })
            .state('compare', {
                url: '/compare',
                templateUrl: 'app/templates/compare.html'
            })
            .state('indoor', {
                url: '/indoor',
                templateUrl: 'app/templates/indoor.html'
            })
            .state('radar', {
                url: '/radar',
                templateUrl: 'app/templates/radar.html'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'app/templates/myProfile.html'
            })
            .state('stations', {
                url: '/stations',
                templateUrl: 'app/templates/myStations.html'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/templates/registerStation.html'
            })
            .state('error', {
                templateUrl: 'app/templates/404.html'
            });
        $httpProvider.interceptors.push('AuthInterceptorService');
    })
    .run(['AuthService', (authService)=> {
        authService.fillAuthData();
    }]);

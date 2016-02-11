///<reference path='./typings/tsd.d.ts' />

import Services = require('./app/services/module');
import Controllers = require('./app/controllers/module');
import Directives = require('./app/directives/module');

angular.module('app', [
        'nemLogging',
        'ui-leaflet',
        'ui.router',
        Services.name,
        Controllers.name,
        Directives.name,
        'nvd3',
        'ngStorage',
        'ui.bootstrap',
        'ngAnimate',
        'angularMoment',
        'ngMaterial'
    ])
    .config(($stateProvider, $urlRouterProvider, $httpProvider) => {
        $urlRouterProvider.otherwise('/map');
        $urlRouterProvider.when('/config','/config/profile');
        $stateProvider
            .state('config', {
                url: '/config',
                templateUrl: 'app/templates/configTemplate.html'
            })
            .state('config.profile', {
                url: '/profile',
                templateUrl: 'app/templates/myProfile.html'
            })
            .state('config.stations', {
                url: '/stations',
                templateUrl: 'app/templates/myStations.html'
            })
            .state('config.register', {
                url: '/register',
                templateUrl: 'app/templates/registerStation.html'
            })
            .state('config.preferences', {
                url: '/preferences',
                templateUrl: 'app/templates/userPreferences.html'
            })
            .state('map', {
                url: '/map',
                template: '<map-view></map-view>'
            })
            .state('almanac', {
                url: '/almanac',
                template: '<almanac-view></almanac-view>'
            })
            .state('compare', {
                url: '/compare',
                templateUrl: 'app/templates/compare.html'
            })
            .state('indoor', {
                url: '/indoor',
                templateUrl: 'app/templates/indoor.html'
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

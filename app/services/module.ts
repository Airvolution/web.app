///<reference path="../../typings/tsd.d.ts" />

import LocationService = require('./Location/LocationService');
import APIService = require('./APIService');
import AuthService = require('./Auth/AuthService');
import SelectionService = require('./Selection/SelectionService');
import AuthInterceptorService = require("./Auth/AuthInterceptorService");
import OpenWeatherService = require('./Weather/OpenWeatherService');
import MapFactory = require("./Map/MapFactory");
import SearchService = require("./SearchService");
import PreferencesService = require('./Preferences/PreferencesService');

export = angular.module('services', [])
            .service(LocationService.serviceName, LocationService)
            .service(APIService.serviceName, APIService)
            .service(AuthService.serviceName, AuthService)
            .service(SelectionService.serviceName, SelectionService)
            .service(AuthInterceptorService.serviceName, AuthInterceptorService)
            .service(SelectionService.serviceName, SelectionService)
            .service(OpenWeatherService.serviceName, OpenWeatherService)
            .service(MapFactory.serviceName, MapFactory)
            .service(SearchService.serviceName, SearchService)
            .service(PreferencesService.serviceName, PreferencesService);

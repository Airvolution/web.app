///<reference path="../../typings/tsd.d.ts" />

import NotificationService = require('./NotificationService');
import LocationService = require('./Location/LocationService');
import APIService = require('./APIService');
import AuthService = require('./Auth/AuthService');
import SelectionService = require('./Selection/SelectionService');
import AuthInterceptorService = require("./Auth/AuthInterceptorService");
import OpenWeatherService = require('./Weather/OpenWeatherService');
import MapFactory = require("./Map/MapFactory");
import SearchService = require("./SearchService");
import PreferencesService = require('./Preferences/PreferencesService');
import AQIService = require('./AQIService');
import ParameterService = require('./ParameterService');

export = angular.module('services', [])
            .service(NotificationService.serviceName, NotificationService)
            .service(LocationService.serviceName, LocationService)
            .service(APIService.serviceName, APIService)
            .service(AuthService.serviceName, AuthService)
            .service(SelectionService.serviceName, SelectionService)
            .service(AuthInterceptorService.serviceName, AuthInterceptorService)
            .service(SelectionService.serviceName, SelectionService)
            .service(OpenWeatherService.serviceName, OpenWeatherService)
            .service(MapFactory.serviceName, MapFactory)
            .service(SearchService.serviceName, SearchService)
            .service(PreferencesService.serviceName, PreferencesService)
            .service(AQIService.serviceName, AQIService)
            .service(ParameterService.serviceName, ParameterService);

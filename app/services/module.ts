///<reference path="../../typings/tsd.d.ts" />

import LocationService = require('./Location/LocationService');
import AMSServiceAPI = require('./StationAPI/AMSServiceAPI');
import SelectionService = require('./Selection/SelectionService');
import OpenWeatherService = require('./Weather/OpenWeatherService');

export = angular.module('services', [])
            .service(LocationService.serviceName, LocationService)
            .service(AMSServiceAPI.serviceName, AMSServiceAPI)
            .service(SelectionService.serviceName, SelectionService)
            .service(OpenWeatherService.serviceName, OpenWeatherService);

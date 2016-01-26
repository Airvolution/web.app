///<reference path="../../typings/tsd.d.ts" />

import LocationService = require('./Location/LocationService');

export = angular.module('services', [])
            .service(LocationService.serviceName, LocationService);

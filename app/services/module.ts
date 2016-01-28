///<reference path="../../typings/tsd.d.ts" />

import LocationService = require('./Location/LocationService');
import AMSServiceAPI = require('./StationAPI/AMSServiceAPI');

export = angular.module('services', [])
            .service(LocationService.serviceName, LocationService)
            .service(AMSServiceAPI.serviceName, AMSServiceAPI);

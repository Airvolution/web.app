///<reference path="../../typings/tsd.d.ts" />

import LocationService = require('./Location/LocationService');
import AMSServiceAPI = require('./StationAPI/AMSServiceAPI');
import AuthService = require('./Auth/AuthService');
import SelectionService = require('./Selection/SelectionService');

export = angular.module('services', [])
            .service(LocationService.serviceName, LocationService)
            .service(AMSServiceAPI.serviceName, AMSServiceAPI)
            .service(AuthService.serviceName, AuthService)
            .service(SelectionService.serviceName, SelectionService);

/// <reference path="../../../typings/tsd.d.ts" />
import ConsecutiveDaysFactory = require("./ConsecutiveDaysFactory");
export = angular.module('app.widgets.services',[])
    .service(ConsecutiveDaysFactory.serviceName, ConsecutiveDaysFactory);

/// <reference path="../../../../typings/tsd.d.ts" />

import MyStationsDirective = require("./myStationsDirective");
import RegisterStationDirective = require("./registerStationDirective");
import StationDirective = require("./stationDirective");
import SystemNotificationDirective = require("./systemNotificationDirective");
import CalibrateStationDirective = require("./calibrateStationDirective");
export = angular.module("app.directives.config.stations",[])
    .directive(MyStationsDirective.htmlName, MyStationsDirective.create)
    .directive(RegisterStationDirective.htmlName, RegisterStationDirective.create)
    .directive(StationDirective.htmlName, StationDirective.create)
    .directive(SystemNotificationDirective.htmlName, SystemNotificationDirective.create)
    .directive(CalibrateStationDirective.htmlName, CalibrateStationDirective.create);

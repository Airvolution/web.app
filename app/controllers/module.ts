///<reference path="../../typings/tsd.d.ts" />
import services = require('../services/module');
import HeatMapController = require('./HeatMapController/HeatMapController');

export = angular.module('controllers',
    [   "services"
    ])
            .controller(HeatMapController.name, HeatMapController);

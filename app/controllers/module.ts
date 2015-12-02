///<reference path="../../typings/tsd.d.ts" />
import services = require('../services/module');
import HeatMapController = require('./HeatMapController/HeatMapController');
import MapController = require('./MapController/MapController');

export = angular.module('controllers',
    [   "services"
    ])
            .controller(HeatMapController.name, HeatMapController)
            .controller(MapController.name, MapController);

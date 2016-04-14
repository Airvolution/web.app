/// <reference path="../../../typings/tsd.d.ts" />

import ConsecutiveDaysWidgetController = require('./consecutiveDaysWidgetController');
import TrendsWidgetController = require("./trendsWidgetController");
import HeatmapWidgetController = require('./heatmapWidgetController');

export = angular.module('app.widgets.controllers',[])
    .controller(ConsecutiveDaysWidgetController.name,ConsecutiveDaysWidgetController)
    .controller(TrendsWidgetController.name, TrendsWidgetController)
    .controller(HeatmapWidgetController.name, HeatmapWidgetController);

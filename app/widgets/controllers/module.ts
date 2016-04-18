/// <reference path="../../../typings/tsd.d.ts" />

import ConsecutiveDaysWidgetController = require('./consecutiveDaysWidgetController');
import TrendsWidgetController = require("./trendsWidgetController");
import HeatmapWidgetController = require('./heatmapWidgetController');
import AverageWidgetController = require("./averageWidgetController");
import MonthlyPieChartWidgetController = require('./monthlyPieChartWidgetController');
import LongestStreaksWidgetController = require('./longestStreaksWidgetController');
import ClosestStationWidgetController = require('./closestStationController');

export = angular.module('app.widgets.controllers',[])
    .controller(ConsecutiveDaysWidgetController.name,ConsecutiveDaysWidgetController)
    .controller(TrendsWidgetController.name, TrendsWidgetController)
    .controller(HeatmapWidgetController.name, HeatmapWidgetController)
    .controller(AverageWidgetController.name, AverageWidgetController)
    .controller(MonthlyPieChartWidgetController.name, MonthlyPieChartWidgetController)
    .controller(LongestStreaksWidgetController.name, LongestStreaksWidgetController)
    .controller(ClosestStationWidgetController.name, ClosestStationWidgetController);

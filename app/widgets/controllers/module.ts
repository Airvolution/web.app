/// <reference path="../../../typings/tsd.d.ts" />

import ConsecutiveDaysWidgetController = require('./consecutiveDaysWidgetController');
import TrendsWidgetController = require("./trendsWidgetController");
import AverageWidgetController = require("./averageWidgetController");
import MonthlyPieChartWidgetController = require('./monthlyPieChartWidgetController');

export = angular.module('app.widgets.controllers',[])
    .controller(ConsecutiveDaysWidgetController.name,ConsecutiveDaysWidgetController)
    .controller(TrendsWidgetController.name, TrendsWidgetController)
    .controller(AverageWidgetController.name, AverageWidgetController)
    .controller(MonthlyPieChartWidgetController.name, MonthlyPieChartWidgetController);

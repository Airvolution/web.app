/// <reference path="../../../typings/tsd.d.ts" />
import ConsecutiveDaysWidgetController = require('./consecutiveDaysWidgetController');
export = angular.module('app.widgets.controllers',[])
    .controller(ConsecutiveDaysWidgetController.name,ConsecutiveDaysWidgetController);

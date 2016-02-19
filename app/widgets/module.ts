/// <reference path="../../typings/tsd.d.ts" />
import WidgetController = require('./controllers/module');
import WidgetServices = require('./services/module');

export = angular.module('app.widgets',[
    WidgetController.name,
    WidgetServices.name
]);

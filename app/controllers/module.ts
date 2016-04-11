///<reference path='../../typings/tsd.d.ts' />
import NVD3Controller = require('./NVD3/NVD3Controller');
import AQIController = require('./AQI/AQIController');
import HeaderController = require('./Index/HeaderController');
import AppController = require('./Index/AppController');
import AboutUsController = require('./Footer/AboutUsController');
import ErrorModalController = require("./Modal/ErrorModalController");

export = angular.module('controllers', [])
            .controller(NVD3Controller.name, NVD3Controller)
            .controller(AQIController.name, AQIController)
            .controller(HeaderController.name, HeaderController)
            .controller(AppController.name, AppController)
            .controller(AboutUsController.name, AboutUsController)
            .controller(ErrorModalController.name, ErrorModalController);

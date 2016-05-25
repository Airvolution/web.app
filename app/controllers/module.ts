///<reference path='../../typings/tsd.d.ts' />
import ErrorModalController = require("./Modal/ErrorModalController");

export = angular.module('controllers', [])
            .controller(ErrorModalController.name, ErrorModalController);

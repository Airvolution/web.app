///<reference path="./typings/tsd.d.ts" />

import services = require("./app/services/module"); services;
import directives = require("./app/directives/module"); directives;
import controllers = require("./app/controllers/module"); controllers;

angular.module("test", [
    "nemLogging",
    "ui-leaflet",
    "ui.router",
    "services",
    "controllers",
    "directives",
    "nvd3"
]);
/// <reference path="../../../typings/tsd.d.ts" />
import AboutDirective = require('./AboutDirective');

export = angular.module('app.directives.about',[])
    .directive(AboutDirective.htmlName, AboutDirective.create);

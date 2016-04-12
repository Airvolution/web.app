/// <reference path="../../../typings/tsd.d.ts" />
import ContactUsDirective = require('./ContactUsDirective');

export = angular.module('app.directives.contactUs',[])
    .directive(ContactUsDirective.htmlName, ContactUsDirective.create);

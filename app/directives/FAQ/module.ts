/// <reference path="../../../typings/tsd.d.ts" />
import FAQViewDirective = require('./FAQViewDirective');

export = angular.module('app.directives.faq',[])
    .directive(FAQViewDirective.htmlName, FAQViewDirective.create);

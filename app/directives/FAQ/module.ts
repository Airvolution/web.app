/// <reference path="../../../typings/tsd.d.ts" />
import FAQViewDirective = require('./FAQViewDirective');
import ScrollToDirective = require("./ScrollToDirective");
import QuestionAnswerViewDirective = require('./QuestionAnswerViewDirective');

export = angular.module('app.directives.faq',[])
    .directive(FAQViewDirective.htmlName, FAQViewDirective.create)
    .directive(ScrollToDirective.htmlName, ScrollToDirective.create)
    .directive(QuestionAnswerViewDirective.htmlName, QuestionAnswerViewDirective.create);

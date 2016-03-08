/// <reference path="../../../typings/tsd.d.ts" />
import QuestionAnswerViewController = require('./QuestionAnswerViewController');
export = QuestionAnswerViewDirective;

class QuestionAnswerViewDirective implements ng.IDirective {
    public static htmlName = 'faqQuestion';

    public restrict = "E";
    public templateUrl = 'app/directives/FAQ/QuestionAnswerViewTemplate.html';
    public controller = QuestionAnswerViewController;
    public controllerAs = 'ctrl';
    public bindToController = true;

    public static create() {
        return new QuestionAnswerViewDirective();
    }
}
